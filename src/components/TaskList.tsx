'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Task } from '@/types/task';


interface TaskListProps {
  onEditTask: (task: Task) => void;
  refreshTrigger: number;
}

export default function TaskList({ onEditTask, refreshTrigger }: TaskListProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, 'tasks'),
      where('userEmail', '==', user.email)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, refreshTrigger]);

  const toggleTaskCompletion = async (task: Task) => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      await updateDoc(taskRef, {
        completed: !task.completed,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found. Create your first task above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
            task.priority === 'High' ? 'border-l-red-500' :
            task.priority === 'Medium' ? 'border-l-yellow-500' :
            'border-l-green-500'
          } ${task.completed ? 'opacity-60' : ''}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task)}
                className="mt-1 h-4 w-4 text-blue-600 rounded"
              />
              
              <div className="flex-1">
                <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-gray-600 mt-1">{task.description}</p>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority} Priority
                  </span>
                  <span className="text-xs text-gray-500">
                    Created: {task.createdAt?.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEditTask(task)}
                disabled={task.completed}
                className="text-blue-600 hover:text-blue-800 disabled:text-gray-400"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}