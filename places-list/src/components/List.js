import React from "react";

const List = ({ list }) => (
  <div class="container">
    <ul class="myUL">
      {list.map((item) => (
        <li key={item.id}>{item.place}</li>
      ))}
    </ul>
  </div>
);

export default List;
