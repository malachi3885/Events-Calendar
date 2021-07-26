import React, { useContext, useState } from "react";
import axios from "axios";

import { EventsContext } from "./store/event-context";
import Header from "./components/Header";
import AddEventCard from "./components/AddEventCard";
import MyCalendar from "./components/MyCalendar";
import "./App.css";

const App = () => {
  const { data, dateWithEvents } = useContext(EventsContext);
  const [showAddEvent, setShowAddEvent] = useState(false);
  //   console.log(data);
  //   console.log(dateWithEvents);

  const addEventHandler = () => {
    setShowAddEvent(true);
  };

  const closeAddEventHandler = () => {
    setShowAddEvent(false);
  };

  return (
    <div className="App">
      <Header addEvent={addEventHandler} />
      {showAddEvent && (
        <AddEventCard
          className="card-absolute"
          onClose={closeAddEventHandler}
        />
      )}
      <div className="main-content">
        <MyCalendar />
      </div>
    </div>
  );
};

export default App;
