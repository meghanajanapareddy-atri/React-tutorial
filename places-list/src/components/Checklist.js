const options = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
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

export { options, uncheckAll, toggleOption };
