const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// use middlewares
app.use(cors());
app.use(express.json());

// mongoDB Connection
const connection = require("./db/connection");

// using routes
app.use(require("./routes/route"));

connection
  .then((db) => {
    if (!db) return process.exit(1);

    // Listen to the http server
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });

    app.on("error", (err) => {
      console.log(`Failed to connec to HTTP server : ${err}`);
    });

    // If there is an error in mongoDB connction
  })
  .catch((error) => {
    console.log(`Connection to MongoDB Failed with ${error}`);
  });
