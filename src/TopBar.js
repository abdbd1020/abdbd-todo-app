import React from "react";
import { CButton } from "@coreui/react";

const TopBar = ({ setIsEditModalVisible, setIsEditMode }) => {
  return (
    <div className="TopBar">
      <div className="appName" style = {{color : "#ffffff"}}>Abd-bd-todo-app</div>
      
      <div className="button">
      <CButton
        style={{ marginLeft: "auto" , float : "right", 

        position:"absolute",
        top:10,
        right:10 ,
    padding : 10}}
        color="primary"
        onClick={() => {
          setIsEditModalVisible(true);
          setIsEditMode(false);
        }}
      >
        Add Task
      </CButton>
      </div>
    </div>
  );
};

export default TopBar;
