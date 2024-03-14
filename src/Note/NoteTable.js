import React from "react";
import { CAlert, CTabs, CTabContent, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

export const NoteTable = ({ notes, updateNote, deleteNote }) => {
    if (!notes.length) {
        return <CAlert color="primary">No notes available</CAlert>;
    }

    return (
        <CTable striped>
            <CTableHead>
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
                            <button onClick={() => updateNote(note.id)}>Update</button>
                            <button onClick={() => deleteNote(note.id)}>Delete</button>
                        </CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    );
};