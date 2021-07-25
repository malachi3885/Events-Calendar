import React from "react";

const Header = (props) => {
  return (
    <header className="navbar bg-primary d-flex justify-content-start">
      <h1 className="text-white">Calendar</h1>
      <ul className="navbar-nav mr-2 d-flex flex-row">
        <li className="nav-item active">
          <button className="btn btn-secondary" onClick={props.addEvent}>
            + Create
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
