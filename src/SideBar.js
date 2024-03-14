import React, { useState } from 'react';

function Sidebar({ tasks, setFilteredTasks }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filterTasks = () => {
    let filtered = tasks.filter(task => {
      if (filterStatus === 'All' || task.status === filterStatus) {
        return task.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
    setFilteredTasks(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterTasks();
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    filterTasks();
  };

  return (
    <div className="sidebar" style={{ position: 'fixed', top: 0, left: 0, width: '200px', height: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      <select value={filterStatus} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}

export default Sidebar;