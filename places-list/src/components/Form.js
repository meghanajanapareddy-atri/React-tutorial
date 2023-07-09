import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import { useState } from "react";
import { options } from "./Checklist";

function Form({ onAdd }) {
  const { register, handleSubmit, reset } = useForm();
  const [checkedList, setCheckedList] = useState([]);

  const onSubmit = (data) => {
    onAdd(data.place, data.description, data.visited, checkedList);
    reset();
  };
  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedList([...checkedList, value]);
    } else {
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };

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
          {options.map(({ id, name }) => (
            <label key={id}>
              {name}
              <input
                type="checkbox"
                id={`checkbox-${id}`}
                name={id}
                value={name}
                onChange={handleSelect}
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
