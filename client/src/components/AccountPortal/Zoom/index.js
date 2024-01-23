import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ZOOM_MEETINGS } from "../../../utils/queries";

import { getUserId } from "../../../utils/getUserId";

import Meetings from "./Meetings";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeUpdate from "./EmployeeUpdate";
import Reports from "./Reports";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function ZoomAccount() {
  //SECTION GET CURRENT LOGIN IN USER
  const userId = getUserId();

   //SECTION GET ALL ZOOM MEETINGS FOR CURRRENT USER
   const {
    // eslint-disable-next-line
    loading,
    // eslint-disable-next-line
    data,
    // eslint-disable-next-line
    error,
    // eslint-disable-next-line
    refetch,
  } = useQuery(QUERY_ZOOM_MEETINGS, {
    variables: {
      user: userId, 
    },
    onCompleted: (data) => {
      // console.log(data);
    },
  });

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
        <Meetings data={data}/>
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
