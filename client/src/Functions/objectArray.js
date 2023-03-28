const data = require("../data.json");

export const newDataArray = data.map((arr) => {
  return {
    name: arr[0],
    id: arr[1],
  };
});
