import React, { useState } from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CRow,
  CCol,
} from "@coreui/react";
import { ClientEnum } from "./ClientEnum";

export const SideBar = ({ onSearch, onStatusFilter, onPriorityFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleStatusFilterChange = (event) => {
    const value = event.target.value;
    setStatusFilter(value);
    onStatusFilter({ status: statusFilter });
  };

  const handlePriorityFilterChange = (event) => {
    const value = event.target.value;
    setPriorityFilter(value);
    onPriorityFilter({ priority: priorityFilter });
  };

  const priorityOptions = [
    { value: "All", label: "All" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5 " },
  ];

  return (
    <CSidebar
      fixed="true"
      display="flex"
      position="fixed"
      top="0"
      right="0"
      bottom="0"
      width="200px"
      padding="20px"
    >
      <CSidebarBrand>abdbd-todo-app</CSidebarBrand>
      <CSidebarNav>
        <CFormInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: "10px" }} // Added spacing after search bar
        />
        <CRow>
          <CCol>
            <CFormLabel htmlFor="statusFilter">Status</CFormLabel>
            <CFormSelect
              custom
              name="statusFilter"
              id="statusFilter" // Added ID for label association
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              <option value="all">All</option>
              <option value={ClientEnum.Pending}>{ClientEnum.Pending}</option>
              <option value={ClientEnum.Completed}>
                {ClientEnum.Completed}
              </option>
              <option value={ClientEnum.Failed}>{ClientEnum.Failed}</option>
            </CFormSelect>
          </CCol>
          <CCol>
            <CFormLabel htmlFor="priorityFilter">Priority</CFormLabel>
            <CFormSelect
              custom
              name="priorityFilter"
              id="priorityFilter" // Added ID for label association
              value={priorityFilter}
              onChange={handlePriorityFilterChange}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
      </CSidebarNav>
    </CSidebar>
  );
};

export default SideBar;
