"use client";
import { createContext, useContext, useState, useEffect } from "react";
import * as taskService from "../lib/services/tasks";
import toast from "react-hot-toast";

const ListContext = createContext();

export function ListProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      setLoading(true);
      const listsData = await taskService.getLists();
      setLists(listsData);
    } catch (error) {
      console.error("Failed to fetch lists:", error);
    } finally {
      setLoading(false);
    }
  };

  const createList = async (title) => {
    try {
      await taskService.createList(title);
      await fetchLists();
      toast.success(`List "${title}" created successfully!`);
    } catch (error) {
      console.error("Failed to create list:", error);
      toast.error("Failed to create list");
      throw error;
    }
  };

  const updateList = async (id, title) => {
    try {
      await taskService.updateList(id, { title });
      await fetchLists();
      toast.success("List updated successfully!");
    } catch (error) {
      console.error("Failed to update list:", error);
      toast.error("Failed to update list");
      throw error;
    }
  };

  const deleteList = async (id) => {
    try {
      await taskService.deleteList(id);
      if (selectedList === id) setSelectedList(null);
      await fetchLists();
      toast.success("List deleted successfully!");
    } catch (error) {
      console.error("Failed to delete list:", error);
      toast.error("Failed to delete list");
      throw error;
    }
  };

  return (
    <ListContext.Provider value={{ lists, selectedList, setSelectedList, createList, updateList, deleteList, loading }}>
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
}
