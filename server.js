const express = require("express");
const db = require("./db/database");
const connection = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Default response for any other (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// // Start the server only after the connection to the database is established
connection.on('connect', () => {
    // Listen on the specified port when the server is running
    app.listen(PORT, () => {
        console.log(`Server running on port ${ PORT }`);
    });
});