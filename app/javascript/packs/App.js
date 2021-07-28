import React, { useState } from "react";

import Header from "./components/Header";
import AddEventCard from "./components/AddEventCard";
import MyCalendar from "./components/MyCalendar";
import "./App.css";

const App = () => {
  const [showAddEvent, setShowAddEvent] = useState(false);

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
