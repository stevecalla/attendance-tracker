const { invokeZoomAppsSdk } = require("../apis");

// export async function getParticipantData(getAPIName) {
export const getParticipantData = async (getAPIName) => {
  try {
    // Define your API configuration
    const apiConfig = {
      name: getAPIName, // Replace with the actual API name
      buttonName: null, // Optional, replace with a button name
      options: null, // Optional, replace with API options
    };

    // Call the invokeZoomAppsSdk function
    const clientResponse = await invokeZoomAppsSdk(apiConfig)();

    console.log("Received clientResponse test:", clientResponse.participants);

    return clientResponse;

  } catch (error) {
    // console.error("Error:", error);
    return error;
  };
};

// module.exports = {
//   getParticipantData,
// };