const fs = require("fs");
const Papa = require("papaparse");

const csvFilePath =
  "/Users/js/Documents/Coding/Concordia/Final Project/client/src/ingredients.csv";

const file = fs.createReadStream(csvFilePath);
const stream = Papa.parse(Papa.NODE_STREAM_INPUT, { header: true });

file.pipe(stream);

const data = [];

stream.on("data", (row) => {
  data.push(row);
});

stream.on("end", () => {
  fs.writeFile("data.json", JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("Data successfully converted to JSON.");
  });
});
