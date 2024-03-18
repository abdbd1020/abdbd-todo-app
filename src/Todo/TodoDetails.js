import React from "react";
import { CModal, CModalBody, CModalHeader, CCard, CCardBody, CCardHeader } from "@coreui/react";

export const TodoDetails = ({ visible, onClose, currentTask }) => {
  return (
    <CModal visible={visible} onClose={onClose} alignment="center">
      <CModalHeader>
      </CModalHeader>
      <CModalBody>
        <CCard alignment="left">
          <CCardHeader>
            <h2>{"Task Details"}</h2>
          </CCardHeader>
          <CCardBody>
            <p style={{ textAlign: "left" }}><strong>Name:</strong> {currentTask?.name}</p>
            <p style={{ textAlign: "left" }}><strong>Description:</strong> {currentTask?.description}</p>
            <p style={{ textAlign: "left" }}><strong>Status:</strong> {currentTask?.status}</p>
            <p style={{ textAlign: "left" }}><strong>Priority:</strong> {currentTask?.priority}</p>
            <p style={{ textAlign: "left" }}><strong>Created At:</strong> {currentTask?.createdAt}</p>
            <p style={{ textAlign: "left" }}><strong>Updated At:</strong> {currentTask?.updatedAt}</p>
          </CCardBody>
        </CCard>
      </CModalBody>
    </CModal>
  );
};