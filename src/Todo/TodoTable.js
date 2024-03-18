import React, { useState } from "react";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton } from '@coreui/react';

import { ClientEnum } from "../ClientEnum";

export const TodoTable = ({ tasks, taskDetails, deleteTask, updateTask, handleSearch, handleStatusFilter, handlePriorityFilter, addOrUpdateTask }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);
    const [isActionClicked, setIsActionClicked] = useState(false);

    const handleActionClick = (task) => {
        setIsActionClicked(true)
        setSelectedTask(task);
    };



    return (
        <div className="TodoTableContainer">
            <CTable striped hover responsive="sm" align="middle" className="shadow-sm">
                <CTableHead color="dark">
                    <CTableRow>
                        <CTableHeaderCell>Is <br />done</CTableHeaderCell>
                        <CTableHeaderCell>
                            Task
                            <br />
                            {(
                                <div className="SearchContainer">

                                    <input className="todo-table-header-text"
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            handleSearch(e.target.value)
                                            setSearchTerm(e.target.value)
                                        }}
                                    />
                                </div>
                            )
                            }
                        </CTableHeaderCell>
                        <CTableHeaderCell>Priority
                            <br />

                            <select className="todo-table-header-text"
                                onChange={(e) => handlePriorityFilter(e.target.value)}>
                                <option value={ClientEnum.ALL}>All Priority</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </CTableHeaderCell>
                        <CTableHeaderCell>Status
                            <br />

                            <select className="todo-table-header-text"

                                onChange={(e) => handleStatusFilter(e.target.value)}>
                                <option value={ClientEnum.ALL}>All Status</option>
                                <option value={ClientEnum.Pending}>Pending</option>
                                <option value={ClientEnum.Completed}>Completed</option>
                            </select>
                        </CTableHeaderCell>
                                                <CTableHeaderCell>Is <br />done</CTableHeaderCell>

                        <CTableHeaderCell>All<br />Actions
                        </CTableHeaderCell>

                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {tasks.map((task) => (
                        <CTableRow key={task.id}>
                            <CTableDataCell>
                                <input
                                    type="checkbox"
                                    checked={task.status === ClientEnum.Completed}
                                    onChange={() => {
                                        const updatedTask = { ...task, status: task.status === ClientEnum.Completed ? ClientEnum.Pending : ClientEnum.Completed };
                                        addOrUpdateTask(updatedTask);
                                    }}
                                />
                            </CTableDataCell>
                            <CTableDataCell style={{ textDecoration: task.status === ClientEnum.Completed ? 'line-through' : 'none' }}>
                                {task.name}
                            </CTableDataCell>                            
                            <CTableDataCell>{task.priority}</CTableDataCell>
                            <CTableDataCell>{task.status}</CTableDataCell>
                            <CTableDataCell>
                            {!isActionClicked || selectedTask.id !== task.id ? (
                                <CButton color="primary" size="sm" onClick={() => handleActionClick(task)}>Action</CButton>
                            ) : (
                                <>
                                    <CButton color="info" size="sm" onClick={() => {
                                        setIsActionClicked(false);
                                        taskDetails(selectedTask);
                                    }}>Details</CButton>
                                    <CButton color="success" size="sm" onClick={() => {
                                        setIsActionClicked(false);
                                        updateTask(selectedTask);
                                    }}>Update</CButton>
                                    <CButton color="danger" size="sm" onClick={() => {
                                        setIsActionClicked(false);
                                        deleteTask(selectedTask.id);
                                    }}>Delete</CButton>
                                </>
                            )}
                            </CTableDataCell>
                        </CTableRow>
                    ))}



                </CTableBody>
            </CTable>
        </div>
    );
};



