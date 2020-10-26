const mysql = require("mysql2");

// create a connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee",
  password: "824655",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to employee database");
});

module.exports = connection;