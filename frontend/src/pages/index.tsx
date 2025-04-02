import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import { taskApi } from '@/api/taskApi';
import { Task, TaskStatus } from '@/types/task';
import { data } from 'autoprefixer';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [filter, setFilter] = useState<TaskStatus | undefined>(undefined);
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading, error } = useQuery('tasks', taskApi.getAllTasks);

  const createTaskMutation = useMutation  (taskApi.createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
      setIsFormOpen(false);
    },
  });

  const updateTaskMutation = useMutation(
    ({ id, data }: { id: number; data: Partial<Task> }) => taskApi.updateTask(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        setIsFormOpen(false);
        setEditingTask(undefined);
      },
    }
  );

  const deleteTaskMutation = useMutation(taskApi.deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  const handleCreateOrUpdateTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      updateTaskMutation.mutate({ id: editingTask.id, data: taskData });
    } else {
      createTaskMutation.mutate(taskData as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const sortBy = (status: TaskStatus) => {
    setFilter(status);
  };

  useEffect(() => {
    console.log(`Filtering by: ${filter}`);
    if (filter) {
      taskApi.filterTasks(filter)
        .then(filteredTasks => {
          queryClient.setQueryData('tasks', filteredTasks);
        })
        .catch(error => console.error(`Failed to filter by ${filter}:`, error));
    }
  }, [filter, queryClient]);

  if (error) {
    return <div className="text-red-500">Error loading tasks: {(error as Error).message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <div className="flex flex-row space-x-4">
              <button
                onClick={() => sortBy('IN_PROGRESS')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 opacity-75" 
              >
                In Progress
              </button>
              <button
                onClick={() => sortBy('PENDING')}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-blue-700 opacity-75" 
              >
                Pending
              </button>
              <button
                onClick={() => sortBy('COMPLETED')}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-blue-700 opacity-75" 
              >
                Completed
              </button>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create New Task
            </button>
          </div>

          {isFormOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>
                <TaskForm
                  task={editingTask}
                  onSubmit={handleCreateOrUpdateTask}
                  onCancel={handleCloseForm}
                />
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">Loading tasks...</div>
          ) : (
            <TaskList
              tasks={tasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
} 