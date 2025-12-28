"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/lib/constants";
import { Sidebar } from "@/app/dashboard/Sidebar";
import { Header } from "@/app/dashboard/Header";
import { Spinner } from "@/app/components/ui"; 
import { ListProvider } from "./ListContext";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [mounted, loading, isAuthenticated, router]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <ListProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgb(30, 41, 59)',
            color: '#fff',
            border: '1px solid rgb(51, 65, 85)',
          },
          success: {
            iconTheme: {
              primary: 'rgb(34, 197, 94)',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: 'rgb(239, 68, 68)',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="min-h-screen bg-background text-foreground flex">
        {/*  Shared Sidebar */}
        <SidebarWithContext 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          onLogout={logout}
        />

        {/* Main Content Wrapper */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* 3. Shared Header */}
          <Header 
            user={user} 
            onMenuClick={() => setIsSidebarOpen(true)} 
          />

          {/*  Page Content (Dashboard, Tasks, etc.) */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </ListProvider>
  );
}

// Wrapper component to use the context
function SidebarWithContext({ isOpen, onClose, onLogout }) {
  const { lists, selectedList, setSelectedList, createList, updateList, deleteList } = require("./ListContext").useList();

  const handleCreateList = async (title) => {
    await createList(title);
  };

  const handleUpdateList = async (id, title) => {
    await updateList(id, title);
  };

  const handleDeleteList = async (id) => {
    if (!confirm("Are you sure you want to delete this list and all its tasks?")) return;
    await deleteList(id);
  };

  return (
    <Sidebar 
      isOpen={isOpen}
      onClose={onClose}
      onLogout={onLogout}
      lists={lists}
      selectedList={selectedList}
      onListSelect={setSelectedList}
      onCreateList={handleCreateList}
      onUpdateList={handleUpdateList}
      onDeleteList={handleDeleteList}
    />
  );
}