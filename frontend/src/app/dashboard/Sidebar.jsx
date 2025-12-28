"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, CheckSquare, Settings, LogOut, X, Plus, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function Sidebar({ isOpen, onClose, onLogout, lists, selectedList, onListSelect, onCreateList, onUpdateList, onDeleteList }) {
  const pathname = usePathname();
  const [isCreatingList, setIsCreatingList] = useState(false);
  const [editingListId, setEditingListId] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");
  const [editListTitle, setEditListTitle] = useState("");

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) {
      toast.error("Please enter a list name");
      return;
    }
    await onCreateList(newListTitle);
    setNewListTitle("");
    setIsCreatingList(false);
  };

  const handleUpdateList = async (e, listId) => {
    e.preventDefault();
    if (!editListTitle.trim()) {
      toast.error("Please enter a list name");
      return;
    }
    await onUpdateList(listId, editListTitle);
    setEditingListId(null);
    setEditListTitle("");
  };

  const startEditingList = (e, list) => {
    e.stopPropagation();
    setEditingListId(list._id);
    setEditListTitle(list.title);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:block`}>
        <div className="h-full flex flex-col">
          
          {/* Logo Area */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border">
             <div className="flex items-center gap-3">
                <div className="relative w-6 h-6">
                    <div className="absolute inset-0 border-l-[6px] border-l-transparent border-b-[12px] border-b-primary border-r-[6px] border-r-transparent transform -rotate-12 top-1" />
                    <div className="absolute inset-0 border-l-[8px] border-l-transparent border-b-[16px] border-b-primary-hover border-r-[8px] border-r-transparent transform -rotate-12 left-1" />
                </div>
                <span className="text-xl font-bold tracking-wide text-foreground">TickTrack</span>
             </div>
             {/* Close Button (Mobile Only) */}
             <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
               <X size={24} />
             </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
             <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={pathname === "/dashboard"} />
        
             {/* Lists Section */}
             <div className="pt-6">
               <div className="flex items-center justify-between px-2 pb-2">
                 <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Lists</div>
                 <button 
                   onClick={() => setIsCreatingList(true)}
                   className="text-gray-400 hover:text-primary transition-colors"
                 >
                   <Plus size={16} />
                 </button>
               </div>

               <div className="space-y-1">
                 <div
                   onClick={() => onListSelect(null)}
                   className={`w-full group flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all ${selectedList === null ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-surface-hover hover:text-foreground'}`}
                 >
                   <div className="flex items-center gap-3">
                     <span className="text-lg">📋</span>
                     <span className="font-medium text-sm">All Tasks</span>
                   </div>
                 </div>

                 {lists && lists.map(list => (
                   editingListId === list._id ? (
                     <form 
                       key={list._id}
                       onSubmit={(e) => handleUpdateList(e, list._id)}
                       className="flex gap-2 px-2"
                     >
                       <input
                         type="text"
                         value={editListTitle}
                         onChange={(e) => setEditListTitle(e.target.value)}
                         className="flex-1 bg-surface-hover border border-primary rounded-lg px-3 py-1.5 text-sm outline-none focus:border-primary"
                         autoFocus
                         onBlur={() => {
                           setEditingListId(null);
                           setEditListTitle("");
                         }}
                       />
                     </form>
                   ) : (
                     <div
                       key={list._id}
                       onClick={() => onListSelect(list._id)}
                       className={`w-full group flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-all ${selectedList === list._id ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:bg-surface-hover hover:text-foreground'}`}
                     >
                       <div className="flex items-center gap-3">
                         <span className="text-lg">📝</span>
                         <span className="font-medium text-sm">{list.title}</span>
                       </div>
                       <div className="flex items-center gap-1">
                         <button 
                           onClick={(e) => startEditingList(e, list)}
                           className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-blue-500 transition-all"
                         >
                           <Edit2 size={14} />
                         </button>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             onDeleteList(list._id);
                           }}
                           className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                         >
                           <Trash2 size={14} />
                         </button>
                       </div>
                     </div>
                   )
                 ))}
               </div>
             </div>
             
           
             
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-border">
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Create List Modal */}
      {isCreatingList && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-surface border border-border rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Create New List</h3>
              <button 
                onClick={() => {
                  setIsCreatingList(false);
                  setNewListTitle("");
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateList} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">List Name</label>
                <input
                  type="text"
                  value={newListTitle}
                  onChange={(e) => setNewListTitle(e.target.value)}
                  placeholder="Enter list name..."
                  className="w-full bg-surface-hover border border-border rounded-xl px-4 py-3 text-foreground placeholder-gray-500 outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingList(false);
                    setNewListTitle("");
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-surface-hover text-gray-400 hover:text-white hover:border-gray-400 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Helper for Links
function NavItem({ href, icon, label, active }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
       ${active 
         ? 'bg-primary/10 text-primary' 
         : 'text-gray-400 hover:bg-surface-hover hover:text-foreground'
       }`}
    >
      {icon}
      {label}
    </Link>
  );
}