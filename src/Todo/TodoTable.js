import React, { useState } from "react";
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton } from '@coreui/react';

import { ClientEnum } from "../ClientEnum";
import CIcon from '@coreui/icons-react';
import { cilFilter, cilMagnifyingGlass } from '@coreui/icons';

export const TodoTable = ({ tasks, taskDetails, deleteTask, updateTask, handleSearch, handleStatusFilter, handlePriorityFilter }) => {
    const [searchTerm, setSearchTerm] = useState("");



    return (
        <div className="TodoTableContainer">
            <CTable striped hover responsive="sm" align="middle" className="shadow-sm">
                <CTableHead color="dark">
                    <CTableRow>
                        <CTableHeaderCell>
                            Task
                            <br />
                            {(
                                <div className="SearchContainer">
                                    <CIcon icon={cilMagnifyingGlass} className="text-white" /> {/* White search icon */}

                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            handleSearch(e.target.value)
                                            setSearchTerm(e.target.value)
                                        }}
                                        style={
                                            {
                                                width: '100px',
                                                height: '25px'
                                            }
                                        }
                                    />
                                </div>
                            )
                            }
                        </CTableHeaderCell>
                        <CTableHeaderCell>Priority
                            <br />
                            <CIcon icon={cilFilter} className="text-white" />

                            <select
                                style={
                                    {
                                        width: '100px',
                                        height: '25px'
                                    }
                                } onChange={(e) => handlePriorityFilter(e.target.value)}>
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
                            <CIcon icon={cilFilter} className="text-white" />

                            <select
                                style={
                                    {
                                        width: '100px',
                                        height: '25px'
                                    }
                                }
                                onChange={(e) => handleStatusFilter(e.target.value)}>
                                <option value={ClientEnum.ALL}>ALL Status</option>
                                <option value={ClientEnum.Pending}>Pending</option>
                                <option value={ClientEnum.Completed}>Completed</option>
                                <option value={ClientEnum.Failed}>Deleted</option>
                            </select>
                        </CTableHeaderCell>
                        <CTableHeaderCell><br/>Details 
                        </CTableHeaderCell>
                        <CTableHeaderCell>Update  <br />
                        </CTableHeaderCell>
                        <CTableHeaderCell>Delete   <br />
                        </CTableHeaderCell>
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



