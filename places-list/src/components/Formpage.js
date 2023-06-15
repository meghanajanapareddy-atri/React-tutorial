import React from "react";
import Form from "./Form";
import PageTop from "./PageTop";

function Formpage({ onAdd }) {
  return (
    <div className="container">
      <PageTop />
      <Form onAdd={onAdd} />
    </div>
  );
}

export default Formpage;
