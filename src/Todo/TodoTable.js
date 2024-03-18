import React, { useState } from "react";
import { CAlert, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton } from '@coreui/react';
import { ClientEnum } from "../ClientEnum";

export const TodoTable = ({ tasks, taskDetails, deleteTask, updateTask, handleSearch, handleStatusFilter, handlePriorityFilter }) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");



    return (
        <div className="TodoTableContainer">
            <CTable striped hover responsive="sm" align="middle" className="shadow-sm">
                <CTableHead color="dark">
                    <CTableRow>
                        <CTableHeaderCell>Task         {searchVisible ? (
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        ) : (
                            <i className="fa fa-search" onClick={() => setSearchVisible(true)}></i>
                        )}</CTableHeaderCell>
                        <CTableHeaderCell>Priority
                            <select onChange={(e) => handlePriorityFilter(e.target.value)}>
                                <option value={ClientEnum.ALL}>All Priority</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </CTableHeaderCell>
                        <CTableHeaderCell>Status
                            <select onChange={(e) => handleStatusFilter(e.target.value)}>
                                <option value={ClientEnum.ALL}>All Status</option>
                                <option value={ClientEnum.Pending}>Pending</option>
                                <option value={ClientEnum.Completed}>Completed</option>
                                <option value={ClientEnum.Failed}>Deleted</option>
                            </select>
                        </CTableHeaderCell>
                        <CTableHeaderCell>Details</CTableHeaderCell>
                        <CTableHeaderCell>Update</CTableHeaderCell>
                        <CTableHeaderCell>Delete</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {tasks.map((task) => (
                        <CTableRow key={task.id}>
                            <CTableDataCell>{task.name}</CTableDataCell>
                            <CTableDataCell>{task.priority}</CTableDataCell>
                            <CTableDataCell>{task.status}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="info" size="sm" onClick={() => taskDetails(task.id)}>Details</CButton>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton color="success" size="sm" onClick={() => updateTask(task.id)} className="ml-2">Update</CButton>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton color="danger" size="sm" onClick={() => deleteTask(task.id)} className="ml-2">Delete</CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
            </CTable>
        </div>
    );
};


