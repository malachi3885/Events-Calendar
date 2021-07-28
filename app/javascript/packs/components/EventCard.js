import React from "react";

import "./EventCard.css";

const EventCard = ({ title, color, date }) => {
  const dateObj = new Date(date);
  const time =
    dateObj.getHours().toString() +
    ":" +
    (dateObj.getMinutes() < 10 ? "0" : "") +
    dateObj.getMinutes();
  return (
    <div className="event-card">
      <div
        className={`${
          color !== "None Color" && color !== "" ? color : "none-color"
        } event-box`}
      >
        <span className="time-text">{time}&nbsp;&nbsp;&nbsp;</span>
        <span>{title}</span>
      </div>
    </div>
  );
};

export default EventCard;
