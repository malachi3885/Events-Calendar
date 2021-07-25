import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const EventsContext = createContext();

export const EventsContextProvider = (props) => {
  const [data, setData] = useState();
  const [dateWithEvents, setDateWithEvents] = useState([]);

  useEffect(() => {
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
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <EventsContext.Provider value={{ data, dateWithEvents }}>
      {props.children}
    </EventsContext.Provider>
  );
};
