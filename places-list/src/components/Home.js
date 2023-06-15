import React from "react";
import { Table } from "./Table";
import PageTop from "./PageTop";

function Home({ columns, list, onDelete }) {
  return (
    <div className="homepage">
      <PageTop />
      <br></br>
      <Table data={list} columns={columns} title="" onDelete={onDelete} />
    </div>
  );
}

export default Home;
