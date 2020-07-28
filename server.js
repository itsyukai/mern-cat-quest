const express = require("express"); // require in nodeJS is always "require once"
const mongoose = require("mongoose"); // MongoDB object modeler. Makes dealing with Mongo DB easier
const path = require("path");
const config = require("config");

const app = express();

//Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }) // Adding new mongo url parser and discovery/monitoring engine
  .then(() => console.log("MongoDB Connected.."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/characters", require("./routes/api/characters"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/inventories", require("./routes/api/inventories"));

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
