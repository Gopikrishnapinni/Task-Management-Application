import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { ListFilter } from 'lucide-react';

export const TaskFilter: React.FC = () => {
  const { state, dispatch } = useTaskContext();

  return (
    <div className="flex items-center gap-4">
      <ListFilter size={20} className="text-gray-500" />
      <div className="flex gap-2">
        {(['all', 'pending', 'completed'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
            className={`px-3 py-1 rounded-full capitalize ${
              state.filter === filter
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};