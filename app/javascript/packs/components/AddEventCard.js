import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

import "./AddEventCard.css";

const AddEventCard = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [dateTime, setDateTime] = useState(null);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
    console.log(e.target.value);
  };

  const colorChangeHandler = (e) => {
    setColor(e.target.value);
    console.log(e.target.value);
  };

  const dateChangeHandler = (e) => {
    const datePlusHours = moment(e.target.value).add(7, "hours").toDate();
    setDateTime(datePlusHours);
    // console.log(tmp2);
    // console.log(typeof e.target.value);
  };

  const submitHandler = () => {
    axios
      .post("http://localhost:3000/api/v1/events", {
        title,
        description,
        color,
        date: dateTime,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="backdrop" onClick={props.onClose} />
      <div className="add-event-card">
        <div className="card-header d-flex justify-content-between align-items-center">
          Create Event
          <button
            type="button"
            className="close border-0 bg-transparent"
            onClick={props.onClose}
          >
            <span>&times;</span>
          </button>
        </div>
        <div className="card-body">
          <form className="form-group" onSubmit={submitHandler}>
            <input
              type="text"
              className="form-control"
              placeholder="Add Title"
              value={title}
              onChange={titleChangeHandler}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Add Description"
              value={description}
              onChange={descriptionChangeHandler}
            />
            <select
              className="form-control"
              value={color}
              onChange={colorChangeHandler}
            >
              <option>None Color</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
            <DateTimePickerComponent
              placeholder="Date and time"
              value={dateTime}
              onChange={dateChangeHandler}
            ></DateTimePickerComponent>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEventCard;
