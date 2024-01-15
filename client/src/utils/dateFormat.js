const moment = require("moment");

const format_date_string = (date, time) => {
  // FROM: "01/19/2023" & Time similar to "09:00"
  // TO: January 29 2023 09:00:00 (MST)
  
  const dateAndTime = date + " " + time;
  const tempdate = moment(dateAndTime).format("MMMM DD YYYY HH:mm:ss");
  const stringDateFormat = tempdate + " (MST)";

  return stringDateFormat;
};

const format_date_MMDDYYYY = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "Wed Jan 11 2023"

  let dateMMDDYYYY;

  if (date) {
    dateMMDDYYYY = new Date(date).toDateString();
  }

  return dateMMDDYYYY;
};
const format_date_MMDD = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "Wedneday, Jan 11"

  const dateMMDD = moment(date).format("dddd, MMM DD YYYY");

  return dateMMDD;
};

const format_date_no_hyphen = (date) => {
  // to: Sunday, Feb 05 2023

  const newDate = moment(date).format("dddd, MMM DD YYYY");
  return newDate;
};

const format_date_YYYYDDMM = (date) => {
  // FROM: "November 29 2022 09:00:00 (MST)"
  // TO: "2017-06-01"

  let dateYYYYDDMM;

  if (date) {
    dateYYYYDDMM = new Date(date).toLocaleDateString("en-CA").toString();
  }

  return dateYYYYDDMM;
};

const format_time_HHmmss = (time) => {
  // FROM: "08:00:00 (MST)"
  // TO: "HH:mm:ss"

  let time_HHmmss;

  if (time) {
    time_HHmmss = time.substring(0, 8);
  }

  // alert(`time = ${time}`)
  // alert(`time conv = ${time_HHmmss}`)

  return time_HHmmss;
};

const format_date_ISOString = (date) => {
  // FROM: Mon Jan 23 2023 10:55:38 GMT-0700 (Mountain Standard Time)
  // TO: 2023-01-23T17:55:38.020Z

  let date_iso_string;

  if (date) {
    date_iso_string = new Date(date).toISOString();
  }

  return date_iso_string;
};

const format_date_ISOStringNoTime = (date) => {
  // FROM: Mon Jan 23 2023 10:55:38 GMT-0700 (Mountain Standard Time)
  // TO: 2023-01-23

  console.log(date);
  alert(`format date = ${date}`);

  let date_iso_string_no_time;

  if (date) {
    date_iso_string_no_time = new Date(date).toISOString().split('T')[0];
  }

  return date_iso_string_no_time;
};

module.exports = {
  format_date_string,
  format_date_MMDDYYYY,
  format_date_YYYYDDMM,
  format_date_MMDD,
  format_date_no_hyphen,
  format_time_HHmmss,
  format_date_ISOString,
  format_date_ISOStringNoTime,
};



// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd

// https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today
