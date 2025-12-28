"use client";

import { useState, useEffect } from "react";
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  MoreHorizontal, Plus, Smile, Hash, Clock, CheckCircle2, 
  Circle, Flag, Bell, LayoutGrid, List, Trash2, X, Edit2
} from "lucide-react";
import * as taskService from "../lib/services/tasks";
import { useList } from "./ListContext";
import toast from "react-hot-toast";

export default function TasksPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("list"); 
  
  const { lists, selectedList } = useList();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dueTime: "",
    listId: ""
  });

  useEffect(() => {
    fetchTasks();
  }, [selectedList]);

  const fetchTasks = async () => {
    try {
      const tasksData = await taskService.getTasks(selectedList);
      setTasks(tasksData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      await taskService.createTask({
        title: newTaskTitle,
        listId: selectedList || (lists.length > 0 ? lists[0]._id : null), // Default to first list if none selected
        dueDate: new Date(), // Default to today
      });
      setNewTaskTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      alert(error.message || "Failed to create task");
      // alert("Please select a list to create a task in, or create a list first.");
    }
  };

  const handleOpenTaskModal = () => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const timeStr = today.toTimeString().slice(0, 5);
    
    setEditingTask(null);
    setTaskFormData({
      title: "",
      description: "",
      dueDate: dateStr,
      dueTime: timeStr,
      listId: selectedList || (lists.length > 0 ? lists[0]._id : "")
    });
    setShowTaskModal(true);
  };

  const handleEditTask = (task) => {
    const taskDate = new Date(task.dueDate);
    const dateStr = taskDate.toISOString().split('T')[0];
    const timeStr = taskDate.toTimeString().slice(0, 5);
    
    setEditingTask(task);
    setTaskFormData({
      title: task.title,
      description: task.description || "",
      dueDate: dateStr,
      dueTime: timeStr,
      listId: task.list._id || task.list
    });
    setShowTaskModal(true);
  };

  const handleTaskFormSubmit = async (e) => {
    e.preventDefault();
    if (!taskFormData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }
    if (!taskFormData.listId) {
      toast.error("Please select a list");
      return;
    }
    
    try {
      const dueDateTime = new Date(`${taskFormData.dueDate}T${taskFormData.dueTime}`);
      
      if (editingTask) {
        await taskService.updateTask(editingTask._id, {
          title: taskFormData.title,
          description: taskFormData.description,
          listId: taskFormData.listId,
          dueDate: dueDateTime,
        });
        toast.success("Task updated successfully!");
      } else {
        await taskService.createTask({
          title: taskFormData.title,
          description: taskFormData.description,
          listId: taskFormData.listId,
          dueDate: dueDateTime,
        });
        toast.success("Task created successfully!");
      }
      
      setShowTaskModal(false);
      setEditingTask(null);
      setTaskFormData({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
        listId: ""
      });
      fetchTasks();
    } catch (error) {
      console.error("Failed to save task:", error);
      toast.error(editingTask ? "Failed to update task" : "Failed to create task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "todo" : "completed";
      await taskService.updateTask(task._id, { status: newStatus });
      toast.success(newStatus === "completed" ? "Task completed!" : "Task reopened!");
      fetchTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Failed to update task");
    }
  };

  // Calendar helper functions
  const getTaskCountForDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.getDate() === date && 
             taskDate.getMonth() === currentMonth.getMonth() && 
             taskDate.getFullYear() === currentMonth.getFullYear();
    }).length;
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const isToday = (date) => {
    const today = new Date();
    return date === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const isSelectedDate = (date) => {
    return date === selectedDate.getDate() && 
           currentMonth.getMonth() === selectedDate.getMonth() && 
           currentMonth.getFullYear() === selectedDate.getFullYear();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
          <p className="text-gray-500">Manage your daily goals and schedule.</p>
        </div>
        <div className="flex items-center gap-3">
            <button 
              onClick={() => setView("list")}
              className={`p-2 rounded-lg border transition-all ${view === 'list' ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-gray-400'}`}
            >
               <List size={20} />
            </button>
            <button 
              onClick={() => setView("board")}
              className={`p-2 rounded-lg border transition-all ${view === 'board' ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-gray-400'}`}
            >
               <LayoutGrid size={20} />
            </button>
            <button 
              onClick={handleOpenTaskModal}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Task</span>
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- LEFT COLUMN (Calendar) --- */}
        <div className="w-full lg:w-96 space-y-8 flex-shrink-0">
            
            {/* 1. CALENDAR CARD */}
            <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg">{monthNames[currentMonth.getMonth()]}, {currentMonth.getFullYear()}</h2>
                    <div className="flex gap-2">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-surface-hover rounded-full transition-colors">
                          <ChevronLeft size={20} className="text-gray-400" />
                        </button>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-surface-hover rounded-full transition-colors">
                          <ChevronRight size={20} className="text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 text-center text-xs text-gray-500 font-medium mb-2">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>

                {/* Dates Grid */}
                <div className="grid grid-cols-7 text-center gap-y-2">
                    {/* Empty slots for offset */}
                    {[...Array(getFirstDayOfMonth())].map((_, i) => (
                      <span key={`empty-${i}`}></span>
                    ))}
                    {[...Array(getDaysInMonth())].map((_, i) => {
                        const day = i + 1;
                        const taskCount = getTaskCountForDate(day);
                        const selected = isSelectedDate(day);
                        const today = isToday(day);

                        return (
                            <button 
                                key={day}
                                onClick={() => handleDateClick(day)}
                                className={`relative w-8 h-8 md:w-10 md:h-10 mx-auto rounded-full flex items-center justify-center text-sm transition-all
                                    ${selected 
                                        ? 'bg-primary text-white shadow-md shadow-primary/30 font-bold' 
                                        : today 
                                            ? 'bg-surface-hover text-primary font-bold border border-primary/30'
                                            : 'text-foreground hover:bg-surface-hover'
                                    }
                                `}
                            >
                                {day}
                                {taskCount > 0 && (
                                  <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold
                                    ${selected ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                                    {taskCount}
                                  </span>
                                )}
                            </button>
                        )
                    })}
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">Scheduled</div>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md">{tasks.length} Tasks</span>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN (Task Creation & List) --- */}
        <div className="flex-1 space-y-6">
            
           
            {/*  TASKS LIST */}
            <div className="space-y-3">
                <div className="flex items-center justify-between pb-2">
                    <h3 className="font-bold text-xl">Tasks <span className="text-gray-500 text-sm font-normal ml-2">({tasks.length})</span></h3>
                </div>

                {tasks.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No tasks found. Create one to get started!
                  </div>
                )}

                {tasks.map(task => (
                  <TaskItem 
                      key={task._id}
                      task={task}
                      onToggle={() => handleToggleTask(task)}
                      onEdit={() => handleEditTask(task)}
                      onDelete={() => handleDeleteTask(task._id)}
                  />
                ))}
            </div>

          
        </div>
      </div>

      {/* Task Creation Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-10">
              <h2 className="text-2xl font-bold text-foreground">{editingTask ? "Edit Task" : "Create New Task"}</h2>
              <button 
                onClick={() => {
                  setShowTaskModal(false);
                  setEditingTask(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleTaskFormSubmit} className="p-6 space-y-6">
              {/* Task Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Task Title *</label>
                <input
                  type="text"
                  value={taskFormData.title}
                  onChange={(e) => setTaskFormData({...taskFormData, title: e.target.value})}
                  placeholder="Enter task title..."
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-foreground placeholder-gray-500 outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Description</label>
                <textarea
                  value={taskFormData.description}
                  onChange={(e) => setTaskFormData({...taskFormData, description: e.target.value})}
                  placeholder="Add task description..."
                  rows={3}
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-foreground placeholder-gray-500 outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* List Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Select List *</label>
                <select
                  value={taskFormData.listId}
                  onChange={(e) => setTaskFormData({...taskFormData, listId: e.target.value})}
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                  required
                >
                  <option value="">Choose a list...</option>
                  {lists.map(list => (
                    <option key={list._id} value={list._id}>{list.title}</option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <CalendarIcon size={16} />
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={taskFormData.dueDate}
                    onChange={(e) => setTaskFormData({...taskFormData, dueDate: e.target.value})}
                    className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                    <Clock size={16} />
                    Due Time *
                  </label>
                  <input
                    type="time"
                    value={taskFormData.dueTime}
                    onChange={(e) => setTaskFormData({...taskFormData, dueTime: e.target.value})}
                    className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-foreground outline-none focus:border-primary transition-colors cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowTaskModal(false);
                    setEditingTask(null);
                  }}
                  className="flex-1 px-6 py-3 rounded-xl border border-border bg-surface-hover text-gray-400 hover:text-white hover:border-gray-400 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium transition-all shadow-lg shadow-primary/20"
                >
                  {editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- HELPER COMPONENTS ---

function TaskItem({ task, onToggle, onEdit, onDelete }) {
    const checked = task.status === 'completed';
    
    return (
        <div className={`group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-lg
            ${checked 
                ? 'bg-surface/50 border-border opacity-60' 
                : 'bg-surface border-border hover:border-primary/50'
            }
        `}>
            {/* Checkbox */}
            <button 
                onClick={onToggle}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                ${checked ? 'bg-primary border-primary text-white' : 'border-gray-500 hover:border-primary'}
            `}>
                {checked && <CheckCircle2 size={16} />}
            </button>

            {/* Content */}
            <div className="flex-1">
                <h4 className={`font-medium text-lg ${checked ? 'line-through text-gray-500' : 'text-foreground'}`}>{task.title}</h4>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={14} /> {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>

            {/* Tag */}
            {task.list && (
                <div className={`self-start sm:self-center px-3 py-1 rounded-lg text-xs font-bold text-blue-400 bg-blue-400/10`}>
                    {task.list.title}
                </div>
            )}

            {/* Actions (Hover) */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
              <button 
                onClick={onEdit}
                className="p-2 hover:bg-surface-hover rounded-lg text-gray-400 hover:text-blue-500"
              >
                  <Edit2 size={20} />
              </button>
              <button 
                onClick={onDelete}
                className="p-2 hover:bg-surface-hover rounded-lg text-gray-400 hover:text-red-500"
              >
                  <Trash2 size={20} />
              </button>
            </div>
        </div>
    );
}