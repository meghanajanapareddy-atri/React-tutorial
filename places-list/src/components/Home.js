import React from "react";
import { Table } from "./Table";
import PageTop from "./PageTop";

function Home({ columns, list }) {
  return (
    <div className="homepage">
      <PageTop />
      <br></br>
      <Table data={list} columns={columns} title="" />
    </div>
  );
}

export default Home;
