import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import { useState } from "react";
import { options, uncheckAll, toggleOption } from "./Checklist";

function Form({ onAdd }) {
  const { register, handleSubmit, reset } = useForm();
  var rating = 0;

  const onSubmit = (data) => {
    handleCheck();
    onAdd(data.place, data.description, data.visited, rating);
    reset();
  };

  const [checkedList, setCheckedList] = useState(uncheckAll(options));

  const changeList = (id, checked) => {
    checkedList.map((item) => {
      if (item.checked) {
        if (item.id !== id) {
          item.checked = false;
        }
        rating = item.id;
      }
    });
    setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
  };

  function handleCheck() {
    checkedList.map((item) => {
      if (item.checked) {
        if (item.id === rating) {
          item.checked = false;
        }
        rating = item.id;
      }
      return item;
    });
    return rating;
  }

  return (
    <div className="mainform">
      <div className="form-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("place")}
            placeholder="Enter city name here..."
            name="place"
          />

          <textarea
            {...register("description")}
            placeholder="Enter places visited..."
            name="description"
          ></textarea>

          <label htmlFor="yes">Will visit again?</label>

          <label htmlFor="yes" className="radio-label">
            <input
              {...register("visited", { required: true })}
              type="radio"
              name="visited"
              value="Yes"
              id="yes"
            />
            YES
          </label>

          <label htmlFor="no" className="radio-label">
            <input
              {...register("visited", { required: true })}
              type="radio"
              name="visited"
              value="No"
              id="no"
            />
            NO
          </label>

          <br></br>
          <label>Rating </label>
          {checkedList.map(({ id, name, checked }) => (
            <label key={id}>
              {name}
              <input
                type="checkbox"
                checked={checked}
                id={`checkbox-${id}`}
                name={id}
                onChange={(e) => changeList(id, e.target.checked)}
              />
            </label>
          ))}

          <br></br>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;
