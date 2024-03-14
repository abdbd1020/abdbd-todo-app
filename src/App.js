import './App.css';
import { TodoTable } from './Todo/TodoTable'; 
import { uid } from 'uid';
import { TodoForm } from './Todo/TodoForm'; 
import { CButton } from '@coreui/react';
import React, { useState } from 'react';
import { TodoDetails } from './Todo/TodoDetails';

const mockTasks = [
  {
    id: uid(),
    name: "task 1",
    description: "task 1 descriptionription",
    priority: 5,
    status: "Pending",
    createdAt: "2024-03-12T05:19:29.533Z",
    updatedAt: "2024-03-12T05:19:29.533Z",
  },
  {
    id: uid(),
    name: "task 1",
    description: "task 1 descriptionription",
    priority: 5,
    status: "Pending",
    createdAt: "2024-03-12T05:19:29.533Z",
    updatedAt: "2024-03-12T05:19:29.533Z",
  },
  {
    id: uid(),
    name: "task 2",
    description: "task 2 descriptionription",
    priority: 3,
    status: "Pending",
    createdAt: "2024-03-12T05:19:29.533Z",
    updatedAt: "2024-03-12T05:19:29.533Z",
  },
  {
    id: uid(),
    name: "task 3",
    description: "task 3 descriptionription",
    priority: 1,
    status: "Pending",
    createdAt: "2024-03-12T05:19:29.533Z",
    updatedAt: "2024-03-12T05:19:29.533Z",
  },
  
  
];

function App() {
  
  const [tasks, setTasks] = useState(mockTasks);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (task) => {
    const updatedTasks = tasks.map((n ) => (n.id === task.id ? task : n));
    setTasks(updatedTasks);
    setIsEditModalVisible(false);
  };

  const updateTask = (task) => {
    const updatedTasks =  tasks.reduce((acc, task) => {
      if (task.id === task.id) {
        return task
      }
    }, {})
    setIsEditModalVisible(true);
    setIsEditMode(true);
    setEditingTask(updatedTasks);
  };
  const taskDetails = (task) => {


    
    
    const currentTask = tasks.reduce((acc, task) => {
      if (task.id === task.id) {
        return task
      }
    }, {})

    setIsDetailsModalVisible(true);
    setIsEditMode(false);
    setEditingTask(currentTask);
  };


  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">

      <TodoTable className="TodoTableContainer" tasks={tasks} taskDetails={taskDetails} deleteTask={deleteTask} updateTask={updateTask} />
      <CButton color="primary" onClick={() => { setIsEditModalVisible(true); setIsEditMode(false); }}>Add Task</CButton>

      <TodoForm
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={addTask}
        isUpdate={isEditMode}
        taskToUpdate={editingTask}
      />
      <TodoDetails
        visible={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
        currentTask={editingTask}
      />
    </div>
  );
}

export default App;
