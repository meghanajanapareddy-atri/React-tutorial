import React from "react";
import PageTop from "./PageTop";
import { useLocation } from "react-router-dom";

function PlaceDetails() {
  const location = useLocation();
  const data = location.state.data;

  return (
    <div className="homepage">
      <PageTop />
      <br></br>
      <h1>Row</h1>
      <p>{data.place}</p>
      <p>{data.description}</p>
      <p>{data.visited}</p>
      <p>{data.rating}</p>
    </div>
  );
}

export default PlaceDetails;
