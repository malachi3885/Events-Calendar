import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import EventCard from "./EventCard";
import DateDetailCard from "./DateDetailCard";
import "./MyCalendar.css";

const MyCalendar = ({}) => {
  const [data, setData] = useState();
  const [dateWithEvents, setDateWithEvents] = useState([]);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [detailEvents, setDetailEvents] = useState([]);
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
          }
        }
        setDateWithEvents(updatedDateWithEvents);
      })
      .catch((error) => console.log(error));
  }, []);

  const showEventOnDateHandler = (value) => {
    const objDate = dateWithEvents.find(
      (date) => date.stringDate === value.toDateString()
    );
    if (objDate) {
      setDetailEvents(objDate.events);
      setShowDetailCard(true);
    }
  };

  const detailCardHandler = () => {
    setShowDetailCard(false);
  };

  return (
    <div className="my-calendar">
      {showDetailCard && (
        <DateDetailCard onClose={detailCardHandler} events={detailEvents} />
      )}
      {isLoading && <p>Is loading...</p>}
      {!isLoading && (
        <Calendar
          className="my-calendar"
          tileClassName="day-tile border"
          minDetail="month"
          onClickDay={(value) => showEventOnDateHandler(value)}
          tileContent={({ date }) => {
            if (dateWithEvents.length > 0) {
              for (let i = 0; i < dateWithEvents.length || i < 3; i++) {
                if (date.toDateString() === dateWithEvents[i].stringDate) {
                  //ถ้าถูกวันแล้ว
                  const events = dateWithEvents[i].events;
                  if (events.length > 3) {
                    return events.slice(0, 2).map((event, index) => (
                      <div key={index}>
                        <EventCard
                          title={event.attributes.title}
                          color={event.attributes.color}
                          date={event.attributes.date}
                        />
                        {index === 1 && <p>...</p>}
                      </div>
                    ));
                  }
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
