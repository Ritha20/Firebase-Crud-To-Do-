'use client';

import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task } from '@/types/task';

export default function TasksPage() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">All Tasks</h1>
            <p className="text-gray-600 mt-2">Manage and organize your tasks in one place</p>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <TaskForm
                editingTask={editingTask}
                onTaskUpdated={handleTaskUpdated}
                onCancelEdit={handleCancelEdit}
              />
            </section>

            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Task List</h2>
              <TaskList
                onEditTask={handleEditTask}
                refreshTrigger={refreshTrigger}
              />
            </section>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}