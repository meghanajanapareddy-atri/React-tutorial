import React from "react";
import CheckboxList from "./CheckboxList";
import Form from "./Form";
import { v4 as uuidv4 } from "uuid";
import { Table } from "./Table";
import { createColumnHelper } from "@tanstack/react-table";
import Navbar from "./Navbar";

const places_list = [
  {
    id: "1",
    place: "San Diego",
  },
  {
    id: "2",
    place: "Los Angeles",
  },
];

function Formpage() {
  const [list, setList] = React.useState(places_list);

  function handleAdd(place) {
    const newList = list.concat({ place, id: uuidv4() });
    setList(newList);
  }
  return (
    <div class="container">
      <Navbar />
      <Form onAdd={handleAdd} />
      <CheckboxList />
    </div>
  );
}

export default Formpage;
