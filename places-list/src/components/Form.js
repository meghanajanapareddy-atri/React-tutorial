import React from "react";
import { useForm } from "react-hook-form";

function Form({ onAdd }) {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    onAdd(data.place);
    reset();
  };

  return (
    <div class="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("place")} />
        <input type="submit" />
        <div className="form-check mt-3">
          <label htmlFor="Yes">
            <input
              {...register("visited", { required: true })}
              type="radio"
              name="visited"
              value="Yes"
              className="form-check-input"
              id="yes"
            />{" "}
            YES
          </label>
        </div>
        <div className="form-check">
          <label htmlFor="burger">
            <input
              {...register("visited", { required: true })}
              type="radio"
              name="visited"
              value="No"
              className="form-check-input"
              id="no"
            />{" "}
            NO
          </label>
        </div>
      </form>
    </div>
  );
}

export default Form;
