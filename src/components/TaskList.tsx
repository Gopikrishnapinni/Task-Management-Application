import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTaskContext } from '../context/TaskContext';
import { TaskItem } from './TaskItem';

export const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === 'completed') return task.completed;
    if (state.filter === 'pending') return !task.completed;
    return true;
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = state.tasks.findIndex((task) => task.id === active.id);
      const newIndex = state.tasks.findIndex((task) => task.id === over.id);
      const newTasks = arrayMove(state.tasks, oldIndex, newIndex);
      dispatch({ type: 'REORDER_TASKS', payload: newTasks });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={state.tasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};