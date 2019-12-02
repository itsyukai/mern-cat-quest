const express = require("express"); // require in nodeJS is always "require once"
const mongoose = require("mongoose"); // MongoDB object modeler. Makes dealing with Mongo DB easier
const bodyParser = require("body-parser"); // Lets us get data from body of requests
const path = require("path");
const characters = require("./routes/api/characters");

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

// Mongo DB URI
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }) // Adding new mongo url parser and discovery/monitoring engine
  .then(() => console.log("MongoDB Connected.."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/characters", characters);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
