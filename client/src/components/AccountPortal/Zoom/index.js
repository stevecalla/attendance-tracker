import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Meetings from "./Meetings";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeUpdate from "./EmployeeUpdate";
import Reports from "./Reports";

function ZoomAccount() {
  return (
    <Tabs
      defaultActiveKey="employeeList"
      id="fill-tab-example"
      className="mb-3"
      fill //sizes tabs to fit available space
      unmountOnExit //removes content when entering a different tab
      mountOnEnter
    >
      <Tab eventKey="meetings" title="Meetings">
        <Meetings />
      </Tab>
      <Tab eventKey="reports" title="Reports">
        <Reports/>
      </Tab>
      <Tab eventKey="employeeAdd" title="Add Employee">
        <EmployeeAdd />
      </Tab>
      <Tab eventKey="employeeUpdate" title="Update Employee">
        <EmployeeUpdate />
      </Tab>
    </Tabs>
  );
}

export default ZoomAccount;
