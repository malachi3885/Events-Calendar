import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./MyCalendar.css";
const MyCalendar = ({}) => {
  return (
    <div className="my-calendar">
      <Calendar
        className="my-calendar"
        tileClassName="day-tile"
        minDetail="month"
      />
    </div>
  );
};

export default MyCalendar;
