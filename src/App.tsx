import React from 'react';
import { TaskProvider } from './context/TaskContext';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { TaskFilter } from './components/TaskFilter';
import { CheckSquare } from 'lucide-react';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckSquare size={32} className="text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">
                Task Management App
              </h1>
            </div>
            <p className="text-gray-600">
              Organize your tasks with drag-and-drop simplicity
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <TaskInput />
            
            <div className="mt-8 mb-6">
              <TaskFilter />
            </div>

            <div className="mt-6">
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;