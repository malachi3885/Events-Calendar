import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import EventCard from "./EventCard";
import AddEventCard from "./AddEventCard";
import "./MyCalendar.css";

const MyCalendar = ({}) => {
  const [data, setData] = useState();
  const [dateWithEvents, setDateWithEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [dateWithEvents]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/api/v1/events`)
      .then((res) => {
        const events = res.data.data;
        setData(events);
        let updatedDateWithEvents = [];
        for (var i = 0; i < events.length; i++) {
          const date = new Date(events[i].attributes.date);
          const stringDate = date.toDateString();
          const indexOfDate = updatedDateWithEvents.findIndex(
            (dateWithEvent) => dateWithEvent.stringDate === stringDate
          );
          if (indexOfDate >= 0) {
            const updatedEvents = updatedDateWithEvents[indexOfDate];
            const updatedObject = {
              id: events[i].id,
              type: events[i].type,
              attributes: events[i].attributes,
            };
            updatedEvents.events.push(updatedObject);
            updatedDateWithEvents[indexOfDate] = updatedEvents;
          } else {
            const addDate = {
              stringDate,
              events: [events[i]],
            };
            updatedDateWithEvents = [...updatedDateWithEvents, addDate];
            // console.log(updatedDateWithEvents);
          }
        }
        setDateWithEvents(updatedDateWithEvents);
        console.log(updatedDateWithEvents);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="my-calendar">
      {isLoading && <p>Is loading...</p>}
      {!isLoading && (
        <Calendar
          className="my-calendar"
          tileClassName="day-tile"
          minDetail="month"
          onClickDay={(value, event) => console.log(value)}
          tileContent={({ date }) => {
            if (dateWithEvents.length > 0) {
              for (let i = 0; i < dateWithEvents.length || i < 3; i++) {
                if (date.toDateString() === dateWithEvents[i].stringDate) {
                  //ถ้าถูกวันแล้ว
                  const events = dateWithEvents[i].events;
                  return events.map((event, index) => (
                    <EventCard
                      key={index}
                      title={event.attributes.title}
                      color={event.attributes.color}
                      date={event.attributes.date}
                    />
                  ));
                }
              }
            }
            return;
          }}
        />
      )}
    </div>
  );
};

export default MyCalendar;
