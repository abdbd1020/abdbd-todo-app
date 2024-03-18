import React from "react";
import { CAlert, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton } from '@coreui/react';

export const TodoTable = ({ tasks, taskDetails, deleteTask,updateTask }) => {
    if (!tasks.length) {
        return <CAlert color="primary">No tasks available</CAlert>;
    }

    return (
        <div className="TodoTableContainer">
        <CTable striped hover responsive="sm" align="middle" className="shadow-sm">
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell>Task</CTableHeaderCell>
                    <CTableHeaderCell>Priority</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
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

