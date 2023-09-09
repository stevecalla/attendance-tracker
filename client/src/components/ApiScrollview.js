/* globals zoomSdk */
import { React, useState } from 'react';
import Participants from "../pages/Participants";
import BuyACoffee from "./BuyACoffee";
import Button from "react-bootstrap/Button";
// import { apis, invokeZoomAppsSdk, participants } from "../apis";
import { apis } from "../apis";
import "./ApiScrollview.css";

function ApiScrollview() {
  const [apiSearchText, setApiSearchText] = useState("");
  const [participants, setParticipants] = useState([]);
  const [x, setX] = useState([]);

  const searchHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setApiSearchText(lowerCase);
  };

  const filteredApis = apis?.filter((api) => {
    if (apiSearchText === '') {
      return api;
    } else {
      return api.name.toLowerCase().includes(apiSearchText);
    }
  });

  const invokeZoomAppsSdk = api => () => {
    console.log('invokeAPI' + api);
    const { name, buttonName = '', options = null } = api
    const zoomAppsSdkApi = zoomSdk[name].bind(zoomSdk)
  
    zoomAppsSdkApi(options)
      .then(clientResponse => {
        console.log(`${buttonName || name} success with response: ${JSON.stringify(clientResponse)}`);
  
        // console.log('test test test');
        // console.log(buttonName);
        // console.log(`${buttonName || name}`);
        
        if (`${buttonName || name}` === "getMeetingParticipants") {
          // console.log(clientResponse);
          // console.log(clientResponse.participants[0].screenName);
          // console.log(clientResponse.participants[0].participantId);

          clientResponse.participants.forEach((participant) => {
            !participants.includes(participant.screenName) 
              && setParticipants([...participants, participant.screenName])
          });

          clientResponse.participants.map(({screenName, participantId, role}) => {
            // console.log(screenName, participantId, role);
            return setX([...x, {id: participantId, name: screenName, role: role}]);
          });
          console.log(x);
        }
        return clientResponse;
      })
      .catch(clientError => {
        console.log(`${buttonName || name} error: ${JSON.stringify(clientError)}`);
      });
  }

  return (
    <>
      <div className="api-scrollview">
        <input placeholder="Search for an API"
          onChange={searchHandler}
          label="Search"
          id="api-scrollview-input"
        />

        <div className="attendee-list">
          {filteredApis?.map(api =>
            <Button 
              onClick={invokeZoomAppsSdk(api)}
              className="api-button"
              key={api.buttonName ||
                api.name} > {api.buttonName || api.name}
            </Button>
          )}

        </div>
        <hr className="hr-scroll-border"></hr>
      </div>

      {
        participants.length > 0 && 
        <Participants 
          handleParticipants={participants}
          mockParticipants={[
            {id: "16778240", name: "Steve Calla", role: "host"},
            {id: "16778241", name: "Calla, Steve", role: "host"},
            {id: "16778242", name: "Alexander, Jose", role: "host"},
            {id: "16778243", name: "Barry Jones", role: "host"},
            {id: "16778244", name: "Jones, Barry", role: "host"},
            {id: "16778245", name: "Alexander, Jose", role: "host"},
          ]}
        />
      }

      {
        <Export 
          handleParticipants={participants} 
        />
      }

      {
        <BuyACoffee />
      }

    </>
    )
}

export default ApiScrollview
