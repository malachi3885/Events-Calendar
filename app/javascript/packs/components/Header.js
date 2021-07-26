import React from "react";

import "./Header.css";

const Header = (props) => {
  return (
    <header className="navbar bg-success d-flex justify-content-start header">
      <h1 className="text-white">Calendar</h1>
      <button className="btn btn-secondary mx-4" onClick={props.addEvent}>
        + Create
      </button>
    </header>
  );
};

export default Header;
