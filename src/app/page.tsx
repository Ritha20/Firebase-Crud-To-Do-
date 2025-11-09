'use client';

import { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task } from '@/types/task';

export default function Dashboard() {
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
          <div className="space-y-8">
            <section>
              <TaskForm
                editingTask={editingTask}
                onTaskUpdated={handleTaskUpdated}
                onCancelEdit={handleCancelEdit}
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Tasks</h2>
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