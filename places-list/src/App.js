import React, { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Formpage from "./components/Formpage";
import PlaceDetails from "./components/PlaceDetails";
import axios from "axios";

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
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/places_list");
        setList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function handleAdd(place, description, visited, rating) {
    const addPlace = async () => {
      const newList = {
        place: place,
        id: uuidv4(),
        description: description,
        visited: visited,
        rating: rating,
      };
      const response = await axios.post(
        "http://localhost:3001/places_list",
        newList
      );
      setList([...list, response.data]);
    };
    addPlace();
  }

  function handleDelete(row) {
    const deletePlace = async (id) => {
      await axios.delete(`http://localhost:3001/places_list/${id}`);
      setList(list.filter((item) => item.id !== id));
    };

    deletePlace(row.id);
  }

  const handleEdit = (id, row, rating) => {
    const editPlace = async (id) => {
      await axios.patch(`http://localhost:3001/places_list/${id}`, {
        id: id,
        place: row.place,
        description: row.description,
        visited: row.visited,
        rating: rating,
      });
      setList(
        list.map((item) =>
          item.id === id
            ? {
                ...item,
                id: id,
                place: row.place,
                description: row.description,
                visited: row.visited,
                rating: rating,
              }
            : item
        )
      );
    };
    editPlace(id, row, rating);
  };

  return (
    <div className="container">
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                columns={columns}
                list={list}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
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
