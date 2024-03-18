import "./App.css";
import { TodoTable } from "./Todo/TodoTable";
import { uid } from "uid";
import { TodoForm } from "./Todo/TodoForm";
import React, { useState , useEffect} from "react";
import { TodoDetails } from "./Todo/TodoDetails";
import TopBar from "./TopBar";
import { ClientEnum } from "./ClientEnum";
const mockTasks = [
  {
    id: uid(),
    name: "task 55",
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
  const [currentStatusFilter, setCurrentStatusFilter] = useState(ClientEnum.ALL)
  const [currentPriorityFilter, setCurrentPriorityFilter] = useState(ClientEnum.ALL)
  const [currentSearchTerm, setCurrentSearchTerm] = useState('')

  const [originalTasks, setOriginalTasks] = useState(mockTasks);

  useEffect(() => {
    handleAllFilter();
}, [currentPriorityFilter, currentStatusFilter, currentSearchTerm]);

  const addOrUpdateTask = (task) => {
    const newTasks = tasks.map((n) => (n.id === task.id ? task : n));
    newTasks.priority = Number(newTasks.priority)
    if (!newTasks.includes(task)) newTasks.push(task);
    setTasks(newTasks);
    setOriginalTasks(newTasks);
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
    setIsDetailsModalVisible(true);
    setIsEditMode(false);
    setEditingTask(currentTask);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setOriginalTasks(updatedTasks)
  };

  const handleSearch = (searchTerm) => {
    setCurrentSearchTerm(searchTerm)
    handleAllFilter()
  };

  const handleStatusFilter = (statusFilter) => {
    console.log("Status Filter: ", statusFilter)
    setCurrentStatusFilter(statusFilter)
    handleAllFilter()
  };

  const handlePriorityFilter = (priorityFilter) => {
    setCurrentPriorityFilter(priorityFilter)
    handleAllFilter()
  };
  const handleAllFilter = () => {
    
    setTasks(originalTasks);
    const filteredTasks = originalTasks.filter((task) => {
      console.log(currentPriorityFilter, currentStatusFilter, currentSearchTerm)
        if (currentPriorityFilter === ClientEnum.ALL && currentStatusFilter === ClientEnum.ALL) {
            console.log("Filtering by name only");
            const result = task.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
            console.log("Task: ", task, "Result: ", result);
            return result;
        }
        if (currentPriorityFilter === ClientEnum.ALL) {
            console.log("Filtering by name and status");
            const result = task.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) && task.status === currentStatusFilter;
            console.log("Task: ", task, "Result: ", result);
            return result;
        }
        if (currentStatusFilter === ClientEnum.ALL) {
            console.log("Filtering by name and priority");
            const result = task.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) && task.priority === Number(currentPriorityFilter);
            console.log("Task: ", task, "Result: ", result);
            return result;
        }
        console.log("Filtering by name, priority, and status");
        const result = task.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) && task.priority === Number(currentPriorityFilter) && task.status === currentStatusFilter;
        console.log("Task: ", task, "Result: ", result);
        return result;
    });
    setTasks(filteredTasks);
};

  return (
    <div className="App">
      <div className="TopBar">
        <TopBar  setIsEditMode = {setIsEditMode} setIsEditModalVisible = {setIsEditModalVisible}></TopBar>
      </div>
      <div className="TodoTableContainer" >
        <TodoTable
          className="TodoTableContainer"
          tasks={tasks}
          taskDetails={taskDetails}
          deleteTask={deleteTask}
          updateTask={updateTask} 
          handleSearch = {handleSearch}
          handleStatusFilter = {handleStatusFilter}
          handlePriorityFilter = {handlePriorityFilter}
        />
      </div>


      <TodoForm
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={addOrUpdateTask}
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
