import React from "react";
import "./Popup.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { options, uncheckAll, toggleOption } from "./Checklist";

function PopUpTable({ rowdata, onEdit, closePopup }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const value = handleCheck();
    onEdit(rowdata.id, data, value);
    closePopup();
    reset();
  };

  const [selected, setSelected] = useState(rowdata.visited);
  const [placeState, setPlace] = useState(rowdata.place);
  const [descState, setDescription] = useState(rowdata.description);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const [checkedList, setCheckedList] = useState(uncheckAll(options));

  const changeList = (id, checked) => {
    setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
  };

  function handleCheck() {
    var rating = rowdata.rating;
    checkedList.map((item) => {
      if (item.checked) {
        rating = item.id;
      }
      return item;
    });
    return rating;
  }

  return (
    <div className="popup-container">
      <div className="popup-body">
        <form onSubmit={handleSubmit(onSubmit)} id="popup-form">
          <input
            {...register("place")}
            type="text"
            value={placeState}
            onChange={handlePlaceChange}
            id={`input-${placeState}`}
          />

          <br></br>

          <br></br>

          <textarea
            {...register("description")}
            placeholder="Enter places visited..."
            onChange={handleDescChange}
            value={descState}
            id={`textarea-${placeState}`}
          ></textarea>

          <br></br>

          <br></br>

          <label htmlFor="yes">Will visit again?</label>

          <label htmlFor="yes" className="radio-label">
            <input
              {...register("visited")}
              type="radio"
              name="visited"
              value="Yes"
              checked={selected === "Yes"}
              onChange={handleChange}
              id="yes"
            />
            YES
          </label>

          <label htmlFor="no" className="radio-label">
            <input
              {...register("visited")}
              type="radio"
              name="visited"
              value="No"
              checked={selected === "No"}
              onChange={handleChange}
              id="no"
            />
            NO
          </label>

          <br></br>

          <br></br>

          <label htmlFor="rating">Rating </label>
          {checkedList.map(({ id, name, checked }) => (
            <label key={id}>
              {name}
              <input
                type="checkbox"
                checked={id === parseInt(rowdata.rating, 10) ? true : checked}
                id={`checkbox-${id}`}
                name={id}
                onChange={(e) => changeList(id, e.target.checked)}
              />
              {console.log(rowdata.rating, id)}
            </label>
          ))}

          <br></br>

          <MDBBtn rounded className="navbtn">
            <input type="submit" id="submit" />
          </MDBBtn>
          <MDBBtn rounded className="navbtn" onClick={closePopup}>
            Close X
          </MDBBtn>
        </form>
      </div>
    </div>
  );
}

export default PopUpTable;
