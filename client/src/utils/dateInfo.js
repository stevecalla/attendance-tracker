const getDate = () => {
  //GET TODAY'S dateListlet date = new Date();
  let date = new Date();
  // console.log(date);

  // set options for date
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let formattedDate = Intl.DateTimeFormat("en-US", options).format(date);
  getTime();

  return formattedDate;
};

const getTime = (date) => {
  // set options for hour minute timezone
  let options = {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };

  let formattedTime = Intl.DateTimeFormat("en-US", options).format(date);

  return formattedTime;
};

module.exports = {
  getDate,
  getTime,
};