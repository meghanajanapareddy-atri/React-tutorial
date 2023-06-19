import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import { useState } from "react";

function Form({ onAdd }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onAdd(data.place, data.description, data.visited, data.rating);
    reset();
  };

  const options = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5" },
  ];

  function uncheckAll(options) {
    return options.map((option) => ({
      ...option,
      checked: false,
    }));
  }

  function toggleOption(options, id, checked) {
    return options.map((option) =>
      option.id === id ? { ...option, checked } : option
    );
  }

  const [checkedList, setCheckedList] = useState(uncheckAll(options));

  const changeList = (id, checked) => {
    setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
  };

  return (
    <div className="mainform">
      <div className="form-box">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("place")} placeholder="Enter city name here..." />

          <textarea
            {...register("description")}
            placeholder="Enter places visited..."
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
                {...register("rating")}
                type="checkbox"
                checked={checked}
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
