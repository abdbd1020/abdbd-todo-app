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
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uid(),
    name: "task 1",
    description: "task 1 descriptionription",
    priority: 5,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uid(),
    name: "task 2",
    description: "task 2 descriptionription",
    priority: 3,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uid(),
    name: "task 3",
    description: "task 3 descriptionription",
    priority: 1,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
function App() {
  const [originalTasks, setOriginalTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todo-tasks");
    return savedTasks ? JSON.parse(savedTasks) : mockTasks;
  });

  const [tasks, setTasks] = useState(originalTasks)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentStatusFilter, setCurrentStatusFilter] = useState(ClientEnum.ALL)
  const [currentPriorityFilter, setCurrentPriorityFilter] = useState(ClientEnum.ALL)
  const [currentSearchTerm, setCurrentSearchTerm] = useState('')


  useEffect(() => {
    handleAllFilter();
}, [currentPriorityFilter, currentStatusFilter, currentSearchTerm]);
useEffect(() => {
  localStorage.setItem("todo-tasks", JSON.stringify(originalTasks));
}, [originalTasks]);


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
    console.log(id)
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setOriginalTasks(updatedTasks)
  };

  const handleSearch = (searchTerm) => {
    setCurrentSearchTerm(searchTerm)
    handleAllFilter()
  };

  const handleStatusFilter = (statusFilter) => {
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
        if (currentPriorityFilter === ClientEnum.ALL && currentStatusFilter === ClientEnum.ALL) {
            const result = task.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return result;
        }
        if (currentPriorityFilter === ClientEnum.ALL) {
            const result = task.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) && task.status === currentStatusFilter;
            return result;
        }
        if (currentStatusFilter === ClientEnum.ALL) {
            const result = task.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) && task.priority === Number(currentPriorityFilter);
            return result;
        }
        const result = task.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) && task.priority === Number(currentPriorityFilter) && task.status === currentStatusFilter;
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
          addOrUpdateTask = {addOrUpdateTask}
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
