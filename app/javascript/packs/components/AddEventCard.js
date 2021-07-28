import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "./AddEventCard.css";
import "react-datepicker/dist/react-datepicker.css";

const AddEventCard = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [dateTime, setDateTime] = useState(undefined);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const colorChangeHandler = (e) => {
    setColor(e.target.value);
  };

  const dateChangeHandler = (date) => {
    setDateTime(date);
  };

  const submitHandler = () => {
    axios
      .post("http://localhost:3000/api/v1/events", {
        title: title.trim(),
        description: description.trim(),
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
        <div className="card-header d-flex justify-content-between align-items-center card-header-text">
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
              className="form-control input-form"
              placeholder="Add Title"
              value={title}
              onChange={titleChangeHandler}
              maxlength="30"
              required
            />
            <input
              type="text"
              className="form-control input-form"
              placeholder="Add Description"
              value={description}
              onChange={descriptionChangeHandler}
              maxlength="50"
            />
            <select
              className="form-control input-form"
              value={color}
              onChange={colorChangeHandler}
            >
              <option>None Color</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Purple</option>
              <option>Orange</option>
            </select>
            <div className="w-100 date-picker ">
              <DatePicker
                className="form-control input-form red-border"
                placeholderText="Date and Time"
                selected={dateTime}
                onChange={(date) => dateChangeHandler(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                required
              />
            </div>
            <button className="btn btn-primary save-button">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEventCard;
