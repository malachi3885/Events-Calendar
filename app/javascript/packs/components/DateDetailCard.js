import React from "react";
import axios from "axios";

import { BsFillTrashFill } from "react-icons/bs";
import "./DateDetailCard.css";

const toHourAndMin = (strDate) => {
  const date = new Date(strDate);
  const hour = date.getHours();
  const min = (date.getMinutes() > 10 ? "" : "0") + date.getMinutes();
  return hour + ":" + min;
};

const DateDetailCard = ({ onClose, events = [] }) => {
  const date = new Date(events[0].attributes.date);

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/events/${id}`)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="date-detail-card">
        <div className="date-string">
          <p className="header-text">{date.toDateString()}</p>
          <hr className="header-line" />
        </div>
        {events.map((event, index) => {
          return (
            <div key={index} className="each-event">
              {event.attributes.color && (
                <div className={`${event.attributes.color} color-band`} />
              )}
              <div className="headline">
                <p className="event-time">
                  {toHourAndMin(event.attributes.date)}&nbsp;&nbsp;
                  <span className="event-title">{event.attributes.title}</span>
                </p>
                <BsFillTrashFill
                  className="delete-icon"
                  onClick={() => deleteHandler(event.id)}
                />
              </div>
              <p className="event-description">
                {event.attributes.description}
              </p>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DateDetailCard;
