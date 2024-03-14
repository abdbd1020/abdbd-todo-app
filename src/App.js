import "./App.css";
import { TodoTable } from "./Todo/TodoTable";
import { uid } from "uid";
import { TodoForm } from "./Todo/TodoForm";
import { CButton } from "@coreui/react";
import React, { useState } from "react";
import { TodoDetails } from "./Todo/TodoDetails";
import { SideBar } from "./SideBar";
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
  const [allTasks, setAllTasks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isFilter, setIsFilter] = useState(false);

  const addTask = (task) => {
    const newTasks = tasks.map((n) => (n.id === task.id ? task : n));
    if (!newTasks.includes(task)) newTasks.push(task);
    setTasks(newTasks);
    setIsEditModalVisible(false);
  };

  const updateTask = (currentTaskId) => {
    const updatedTasks = tasks.find((task) => task.id === currentTaskId);

    setIsEditModalVisible(true);
    setIsEditMode(true);
    setEditingTask(updatedTasks);
  };

  const taskDetails = (currentTaskId) => {
    const currentTask = tasks.find((task) => task.id === currentTaskId);
    console.log("currentTask", currentTask);

    setIsDetailsModalVisible(true);
    setIsEditMode(false);
    setEditingTask(currentTask);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleSearch = (searchTerm) => {
    const filteredTasks = tasks.filter((task) =>
      task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (!isFilter) setAllTasks(tasks);
    setTasks(filteredTasks);
    setIsFilter(true);
  };

  const handleStatusFilter = (statusFilter) => {
    const filteredTasks = tasks.filter((task) =>
      statusFilter === "all" ? task : task.status === statusFilter
    );
    if (!isFilter) setAllTasks(tasks);
    setTasks(filteredTasks);
    setIsFilter(true);
  };
  const handlePriorityFilter = (priorityFilter) => {
    console.log("priorityFilter", priorityFilter);
    const filteredTasks = tasks.filter((task) =>
      priorityFilter === "all" ? task : task.priority === priorityFilter
    );
    if (!isFilter) setAllTasks(tasks);
    setTasks(filteredTasks);
    setIsFilter(true);
  };

  return (
    <div className="App">
      <SideBar
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onPriorityFilter={handlePriorityFilter}
      />

      <div className="TodoTableContainer" style={{ marginLeft: "200px" }}>
        <TodoTable
          className="TodoTableContainer"
          tasks={tasks}
          taskDetails={taskDetails}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
      <CButton
        color="primary"
        onClick={() => {
          setIsEditModalVisible(true);
          setIsEditMode(false);
        }}
      >
        Add Task
      </CButton>

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
