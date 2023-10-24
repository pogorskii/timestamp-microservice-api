// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint
// Handle if data string is empty
app.get("/api/", (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Handle if data string isn't empty
app.get("/api/:date?", (req, res) => {
  const inputDate = req.params.date;
  let dateObj;

  // Check if data is in Unix format
  if (/\D/.test(inputDate)) {
    dateObj = new Date(inputDate);
  } else {
    dateObj = new Date(parseInt(inputDate));
  }

  // Check if input data is valid
  if (isNaN(dateObj.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
  }
});

// Listen for requests
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
