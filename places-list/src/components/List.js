import React from "react";

const List = ({ list }) => (
  <div className="container">
    <ul className="myUL">
      {list.map((item) => (
        <li key={item.id}>{item.place}</li>
      ))}
    </ul>
  </div>
);

export default List;
