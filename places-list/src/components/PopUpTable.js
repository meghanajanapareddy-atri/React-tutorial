import React from "react";
import "./Popup.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";

function PopUpTable({ rowdata, onEdit, closePopup }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onEdit(rowdata.id, data);
    closePopup();
    reset();
  };

  //   const options = [
  //     { id: 1, name: "1" },
  //     { id: 2, name: "2" },
  //     { id: 3, name: "3" },
  //     { id: 4, name: "4" },
  //     { id: 5, name: "5" },
  //   ];

  //   function uncheckAll(options) {
  //     return options.map((option) => ({
  //       ...option,
  //       checked: false,
  //     }));
  //   }

  //   function toggleOption(options, id, checked) {
  //     return options.map((option) =>
  //       option.id === id ? { ...option, checked } : option
  //     );
  //   }

  //   const [checkedList, setCheckedList] = useState(uncheckAll(options));

  //   const changeList = (id, checked) => {
  //     setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
  //   };

  const [selected, setSelected] = useState(rowdata.visited);
  //   const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="popup-container">
      <div className="popup-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("place")}
            value={rowdata.place}
            onChange={handleChange}
          />

          <br></br>

          <br></br>

          <textarea
            {...register("description")}
            placeholder="Enter places visited..."
            onChange={handleChange}
            value={rowdata.description}
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

          {/* <label htmlFor="rating">Rating </label>
          {checkedList.map(({ id, name, checked }) => (
            <label key={id}>
              {name}
              <input
                {...register("rating")}
                type="checkbox"
                defaultChecked={checked}
                checked={checked}
                id="rating"
                onChange={(e) => changeList(id, e.target.checked)}
              />
            </label>
          ))}

          <br></br> */}

          <MDBBtn rounded className="navbtn">
            <input type="submit" />{" "}
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
