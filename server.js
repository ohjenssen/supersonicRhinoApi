require('dotenv').config();

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Oskars application" });
})

require("./app/routes/exercise.routes")(app);
require("./app/routes/sets.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

// Don’t forget to call sync() method in server.js:
const db = (require("./app/models"));
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })