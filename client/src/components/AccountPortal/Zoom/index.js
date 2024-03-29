import { useQuery } from "@apollo/client";
import { QUERY_ZOOM_MEETINGS } from "../../../utils/queries";

import { getUserId } from "../../../utils/getUserId";

import Meetings from "./Meetings";

import EmployeeAdd from "./EmployeeAdd";
import EmployeeUpdate from "./EmployeeUpdate";
import Reports from "./Reports";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container } from "react-bootstrap";

function ZoomAccount() {
  //SECTION GET CURRENT LOGIN IN USER
  const userId = getUserId();

  //SECTION GET ALL ZOOM MEETINGS FOR CURRRENT USER
  const {
    // eslint-disable-next-line
    loading,
    // eslint-disable-next-line
    data: meetingData,
    // eslint-disable-next-line
    error,
    // eslint-disable-next-line
    refetch,
  } = useQuery(QUERY_ZOOM_MEETINGS, {
    variables: {
      user: userId,
    },
    onCompleted: (data) => {
      console.log(data);
    },
  });

  console.log("loading status", loading);

  if (loading) {
    return <Container style={{ height: "80vh" }}></Container>;
  } else {
    return (
      // <Container style={{ height: "80vh", overflow: "scroll" }}>
      <Tabs
        defaultActiveKey="meetings"
        id="fill-tab-example"
        className="mb-3"
        fill //sizes tabs to fit available space
        unmountOnExit //removes content when entering a different tab
        mountOnEnter
      >
        <Tab eventKey="account" title="Account">
          <Container style={{ height: "80vh", overflow: "scroll" }}>
            <Reports data={meetingData} />
          </Container>
        </Tab>
        <Tab eventKey="meetings" title="Meetings" data={meetingData}>
          <Container style={{ height: "80vh", overflow: "scroll" }}>
            <Meetings data={meetingData} />
          </Container>
        </Tab>
        {/* <Tab eventKey="employeeAdd" title="Add Employee" data={meetingData}>
          <EmployeeAdd />
        </Tab> */}
        {/* <Tab
          eventKey="employeeUpdate"
          title="Update Employee"
          data={meetingData}
        >
          <EmployeeUpdate />
        </Tab> */}
      </Tabs>
    );
  }
}

export default ZoomAccount;
