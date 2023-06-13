import React from "react";
import { Table } from "./components/Table";
import { createColumnHelper } from "@tanstack/react-table";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Formpage from "./components/Formpage";

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

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor((row) => row.place, {
    id: "place",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Name</span>,
  }),
];

const App = () => {
  return (
    <div class="container">
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/formpage" element={<Formpage />} />
          <Route component={Error} />
        </Routes>
      </main>
      <Table data={places_list} columns={columns} title="Places List" />
    </div>
  );
};

export default App;
