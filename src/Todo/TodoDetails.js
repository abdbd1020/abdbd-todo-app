import React from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormTextarea,
} from "@coreui/react";

export const TodoDetails = ({ visible, onClose, currentTask }) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{"Task Details"}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <CFormInput
            type="text"
            name="Name"
            value={currentTask?.name}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <CFormTextarea
            rows="3"
            name="Description"
            value={currentTask?.description}
            readOnly
          ></CFormTextarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <CFormInput
            type="text"
            name="Status"
            value={currentTask?.status}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <CFormInput
            type="text"
            name="Priority"
            value={currentTask?.priority}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <CFormInput
            type="text"
            name="Created At"
            value={currentTask?.createdAt}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <CFormInput
            type="text"
            name="Updated At"
            value={currentTask?.updatedAt}
            readOnly
          />
        </div>
      </CModalBody>
    </CModal>
  );
};
