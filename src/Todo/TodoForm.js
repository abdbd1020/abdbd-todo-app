import React, { useState, useEffect } from 'react';
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormInput, CFormTextarea, CButton, CFormSelect } from '@coreui/react';
import { ClientEnum } from '../ClientEnum';
import { uid } from 'uid';

const PriorityScale = [1, 2, 3, 4, 5];

export const TodoForm = ({ visible, onClose, onSave, isUpdate, taskToUpdate }) => {
  const [newTask, setNewTask] = useState({ name: '', description: '', status: ClientEnum.Pending, priority: 5 });

  useEffect(() => {
    if (isUpdate && taskToUpdate) {
      setNewTask(taskToUpdate);
    } else {
      setNewTask({ name: '', description: '', status: ClientEnum.Pending, priority: 5 });
    }
  }, [isUpdate, taskToUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value 
    }));
  };

  const handleSave = () => {
    if (newTask.name === '' || newTask.description === '') return;

    const updatedTask = { ...newTask };

    if (!isUpdate) {
      updatedTask.id = uid();
      updatedTask.createdAt = new Date().toISOString();
    }

    updatedTask.updatedAt = new Date().toISOString();

    onSave(updatedTask);

    setNewTask({ name: '', description: '', status: ClientEnum.Pending, priority: 3 });
    onClose();
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{isUpdate ? 'Update Task' : 'Add New Task'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <CFormInput type="text" name="name" value={newTask.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <CFormTextarea rows="3" name="description" value={newTask.description} onChange={handleChange}></CFormTextarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <CFormSelect value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
            {Object.values(ClientEnum).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </CFormSelect>
        </div>
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <CFormSelect name="priority" value={newTask.priority} onChange={handleChange}>
            {PriorityScale.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </CFormSelect>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Cancel</CButton>
        <CButton color="primary" onClick={handleSave}>{isUpdate ? 'Update Task' : 'Add Task'}</CButton>
      </CModalFooter>
    </CModal>
  );
};
