import React, { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Formpage from "./components/Formpage";
import PlaceDetails from "./components/PlaceDetails";

const places_list = [
  {
    id: "1",
    place: "San Diego",
    description: "Amazing Beaches",
    visited: "Yes",
    rating: "5",
  },
  {
    id: "2",
    place: "Los Angeles",
    description: "Hollywood",
    visited: "Yes",
    rating: "4",
  },
];

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor((row) => row.place, {
    id: "place",
    cell: (props) => <span>{`${props.getValue()}`}</span>,
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor((row) => row.description, {
    id: "description",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Description</span>,
  }),
  columnHelper.accessor((row) => row.visited, {
    id: "visited",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Visited</span>,
  }),
  columnHelper.accessor((row) => row.rating, {
    id: "rating",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Rating</span>,
  }),
];

const App = () => {
  const [list, setList] = useState(places_list);

  useEffect(() => {
    localStorage.setItem("places_list", JSON.stringify(places_list));
  });

  function handleAdd(place, description, visited, rating) {
    const newList = list.concat({
      place: place,
      id: uuidv4(),
      description: description,
      visited: visited,
      rating: rating,
    });
    setList(newList);
  }

  function handleDelete(row) {
    const delData = list.filter((tbd) => {
      return row.id !== tbd.id;
    });
    setList(delData);
  }

  return (
    <div className="container">
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home columns={columns} list={list} onDelete={handleDelete} />
            }
            exact
          />
          <Route path="/placedetails" element={<PlaceDetails />} exact />
          <Route path="/formpage" element={<Formpage onAdd={handleAdd} />} />
          <Route component={Error} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
