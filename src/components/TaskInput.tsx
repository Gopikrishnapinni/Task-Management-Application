import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { PlusCircle } from 'lucide-react';

export const TaskInput: React.FC = () => {
  const [title, setTitle] = useState('');
  const { dispatch } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          id: crypto.randomUUID(),
          title: title.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
        },
      });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
      >
        <PlusCircle size={20} />
        Add Task
      </button>
    </form>
  );
};