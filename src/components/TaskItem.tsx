import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types/task';
import { useTaskContext } from '../context/TaskContext';
import { Pencil, Trash2, GripVertical, Check } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const { dispatch } = useTaskContext();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => {
    if (editedTitle.trim()) {
      dispatch({
        type: 'EDIT_TASK',
        payload: { id: task.id, title: editedTitle },
      });
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-gray-200 transition-all"
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={20} />
      </button>

      <button
        onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
        className={`flex-shrink-0 w-5 h-5 border-2 rounded-full ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {task.completed && <Check size={16} className="text-white m-auto" />}
      </button>

      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
          className="flex-1 bg-gray-50 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${
            task.completed ? 'text-gray-400 line-through' : 'text-gray-700'
          }`}
        >
          {task.title}
        </span>
      )}

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-gray-600"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};