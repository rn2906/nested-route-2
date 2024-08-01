const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let shouldCancel = false;

app.get("/route1", (req, res) => {
  console.log("I am route 1");
  res.send("Route 1 response");
});

app.get("/route2", (req, res) => {
  console.log("I am route 2");
  res.send("Route 2 response");
});

app.get("/route3", (req, res) => {
  console.log("I am route 3");
  res.send("Route 3 response");
});

app.get("/route4", (req, res) => {
  console.log("I am route 4");
  res.send("Route 4 response");
});

app.get("/route5", (req, res) => {
  console.log("I am route 5");
  res.send("Route 5 response");
});

app.get("/route6", (req, res) => {
  console.log("I am route 6");
  res.send("Route 6 response");
});

app.get("/route7", (req, res) => {
  console.log("I am route 7");
  res.send("Route 7 response");
});

app.get("/route8", (req, res) => {
  console.log("I am route 8");
  res.send("Route 8 response");
});

app.get("/start-sequence", async (req, res) => {
  shouldCancel = false;
  console.log("Sequence started");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const sendEvent = (event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  try {
    let response;

    sendEvent({
      status: "Starting",
      route: "Route 1",
      message: "Starting Route 1",
      progress: 0,
    });
    await delay(5000);
    response = await axios.get("http://localhost:3001/route1");
    if (shouldCancel) throw new Error("Cancelled at Route 1");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 1",
      message: response.data,
      progress: 12.5, // Incremented by smaller steps
    });

    sendEvent({
      status: "Starting",
      route: "Route 2",
      message: "Starting Route 2",
      progress: 12.5,
    });
    await delay(5000);
    response = await axios.get("http://localhost:3001/route2");
    if (shouldCancel) throw new Error("Cancelled at Route 2");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 2",
      message: response.data,
      progress: 25,
    });

    sendEvent({
      status: "Starting",
      route: "Route 3",
      message: "Starting Route 3",
      progress: 25,
    });
    await delay(5000);
    response = await axios.get("http://localhost:3001/route3");
    if (shouldCancel) throw new Error("Cancelled at Route 3");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 3",
      message: response.data,
      progress: 37.5,
    });

    sendEvent({
      status: "Starting",
      route: "Route 4",
      message: "Starting Route 4",
      progress: 37.5,
    });
    await delay(5000);
    response = await axios.get("http://localhost:3001/route4");
    if (shouldCancel) throw new Error("Cancelled at Route 4");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 4",
      message: response.data,
      progress: 50,
    });

    sendEvent({
      status: "Starting",
      route: "Route 5",
      message: "Starting Route 5",
      progress: 50,
    });
    await delay(5000);
    response = await axios.get("http://localhost:3001/route5");
    if (shouldCancel) throw new Error("Cancelled at Route 5");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 5",
      message: response.data,
      progress: 62.5,
    });

    sendEvent({
      status: "Starting",
      route: "Route 6",
      message: "Starting Route 6",
      progress: 62.5,
    });
    await delay(5000);
    response = await axios.get("http://localhost:3001/route6");
    if (shouldCancel) throw new Error("Cancelled at Route 6");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 6",
      message: response.data,
      progress: 75,
    });

    sendEvent({
      status: "Starting",
      route: "Route 7",
      message: "Starting Route 7",
      progress: 75,
    });
    await delay(5000);
    response = await axios.get("http://localhost:3001/route7");
    if (shouldCancel) throw new Error("Cancelled at Route 7");
    console.log(response.data);
    sendEvent({
      status: "Processing",
      route: "Route 7",
      message: response.data,
      progress: 87.5,
    });

    sendEvent({
      status: "Starting",
      route: "Route 8",
      message: "Starting Route 8",
      progress: 87.5,
    });
    await delay(5000);
    response = await axios.get("http://localhost:3001/route8");
    if (shouldCancel) throw new Error("Cancelled at Route 8");
    console.log(response.data);
    sendEvent({
      status: "Completed",
      route: "Route 8",
      message: "Reached Route 8",
      progress: 100,
    });
    res.end();
  } catch (error) {
    console.log(error.message);
    sendEvent({
      status: "Cancelled",
      route: error.message.split(" ")[2],
      message: error.message,
      progress: 0,
    });
    res.end();
  }
});

app.get("/cancel-sequence", (req, res) => {
  shouldCancel = true;
  console.log("Sequence cancel requested");
  res.send("Cancel request received");
});

app.get("/route9", (req, res) => {
  console.log("I am route 9");
  res.send("Route 9 response");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
