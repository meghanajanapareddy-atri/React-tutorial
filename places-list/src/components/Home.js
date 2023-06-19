import React from "react";
import { Table } from "./Table";
import PageTop from "./PageTop";

function Home({ columns, list, onDelete, onEdit }) {
  return (
    <div className="homepage">
      <PageTop />
      <br></br>
      <Table
        data={list}
        columns={columns}
        title=""
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}

export default Home;
