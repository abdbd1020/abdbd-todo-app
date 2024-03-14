import React, { useState } from 'react';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormInput, CFormTextarea, CButton, CFormSelect } from '@coreui/react';

// Define ClientEnum
const ClientEnum = {
  Pending: 'Pending',
  Completed: 'Completed',
  Failed: 'Failed',
  InProgress: 'InProgress'
};

// Define PriorityScale
const PriorityScale = [1, 2, 3, 4, 5];

export const NoteForm = ({ visible, onClose, onSave }) => {
  const [newNote, setNewNote] = useState({ title: '', desc: '', status: ClientEnum.Pending, priority: 3 });

  const handleSave = () => {
    newNote.createdAt = new Date().toISOString();
    newNote.updatedAt =   newNote.createdAt
    onSave(newNote);
    setNewNote({ title: '', desc: '', status: ClientEnum.Pending, priority: 3 });
    onClose(); // Close modal
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Add New Note</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <CFormInput type="text" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <CFormTextarea rows="3" value={newNote.desc} onChange={(e) => setNewNote({ ...newNote, desc: e.target.value })}></CFormTextarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <CFormSelect value={newNote.status} onChange={(e) => setNewNote({ ...newNote, status: e.target.value })}>
            {Object.values(ClientEnum).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </CFormSelect>
        </div>
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <CFormSelect value={newNote.priority} onChange={(e) => setNewNote({ ...newNote, priority: parseInt(e.target.value) })}>
            {PriorityScale.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </CFormSelect>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Cancel</CButton>
        <CButton color="primary" onClick={handleSave}>Add Note</CButton>
      </CModalFooter>
    </CModal>
  );
};
