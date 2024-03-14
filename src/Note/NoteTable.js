import React from "react";
import { CAlert, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CButton } from '@coreui/react';

export const NoteTable = ({ notes, updateNote, deleteNote }) => {
    if (!notes.length) {
        return <CAlert color="primary">No notes available</CAlert>;
    }

    return (
        <CTable striped hover responsive="sm" align="middle" className="shadow-sm">
            <CTableHead color="dark">
                <CTableRow>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Priority</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Created At</CTableHeaderCell>
                    <CTableHeaderCell>Updated At</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {notes.map((note) => (
                    <CTableRow key={note.id}>
                        <CTableDataCell>{note.title}</CTableDataCell>
                        <CTableDataCell>{note.desc}</CTableDataCell>
                        <CTableDataCell>{note.priority}</CTableDataCell>
                        <CTableDataCell>{note.status}</CTableDataCell>
                        <CTableDataCell>{note.createdAt}</CTableDataCell>
                        <CTableDataCell>{note.updatedAt}</CTableDataCell>
                        <CTableDataCell>
                            <CButton color="info" size="sm" onClick={() => updateNote(note.id)}>Update</CButton>
                            <CButton color="danger" size="sm" onClick={() => deleteNote(note.id)} className="ml-2">Delete</CButton>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    );
};