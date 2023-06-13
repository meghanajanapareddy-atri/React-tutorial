import { useState } from "react";

const options = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
];

function uncheckAll(options) {
  return options.map((option) => ({
    ...option,
    checked: false,
  }));
}

function toggleOption(options, id, checked) {
  return options.map((option) =>
    option.id === id ? { ...option, checked } : option
  );
}

function CheckboxList() {
  const [checkedList, setCheckedList] = useState(uncheckAll(options));

  const changeList = (id, checked) => {
    setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
  };

  return (
    <form>
      {checkedList.map(({ id, name, checked }) => (
        <label key={id}>
          {name}
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => changeList(id, e.target.checked)}
          />
        </label>
      ))}
    </form>
  );
}
export default CheckboxList;
