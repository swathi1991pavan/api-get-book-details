const express = require("express");

const { open } = require("sqlite");
const path = require("path");
const sqLite3 = require("sqlite3");
let db = null;

const dbPath = path.join(__dirname, "goodreads.db");
const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqLite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running");
    });
  } catch (e) {
    console.log(`db error: ${e.message}`);
    process.exit(1);
  }
};
const app = express();

initializeDbServer();

app.get("/books/", async (request, response) => {
  const getBookQuery = `select * from book order by book_id`;
  const dbArray = await db.all(getBookQuery);
  response.send(dbArray);
});
