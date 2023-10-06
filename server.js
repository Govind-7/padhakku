const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const cors = require("cors");
const port = 5000; // Port on which your Node.js server will run

app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "dataBase.db");
let db = null;

const intializeDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
intializeDB();

app.post("/api/signup", async (request, response) => {
  const userData = request.body;
  const { name, email } = userData;
  const testingQuery = `SELECT * FROM userDetails WHERE email=?`;
  const testingResponse = await db.get(testingQuery, [email]);
  //   console.log(testingResponse === undefined);

  if (testingResponse === undefined) {
    const addUserQuery = `INSERT INTO userDetails (name, email) VALUES (?, ?);`;
    try {
      const dbResponse = await db.run(addUserQuery, [name, email]);
      const userID = dbResponse.lastID;
      response.json({ userid: userID, message: "Successful user sign-up" });
    } catch (error) {
      console.error("Error inserting user:", error.message);
      response
        .status(500)
        .json({ message: "An error occurred while signing up" });
    }
  } else {
    response.send({ message: "user already exist" });
  }
});

app.post("/api/posts", async (request, response) => {
  const userData = request.body;
  const { name, email } = userData;
  //   console.log(name);
  const testingQuery = `SELECT * FROM userDetails WHERE id=?`;
  const testingResponse = await db.get(testingQuery, [parseInt(name)]);
  //   console.log(testingResponse);

  if (testingResponse !== undefined) {
    const addUserQuery = `INSERT INTO masseges (customerId, msg) VALUES (?, ?);`;
    try {
      const dbResponse = await db.run(addUserQuery, [name, email]);
      const postID = dbResponse.lastID;
      response.json({ postid: postID, message: "Successful posted" });
    } catch (error) {
      console.error("Error inserting user:", error.message);
      response
        .status(500)
        .json({ message: "An error occurred while signing up" });
    }
  } else {
    response.send({ message: "user not exist" });
  }
});

app.delete("/api/deletepost/:postId", async (request, response) => {
  const { postId } = request.params;

  //   console.log(postId);
  const testingQuery = `SELECT * FROM masseges WHERE id=?`;
  const testingResponse = await db.get(testingQuery, [parseInt(postId)]);
  //   console.log(testingResponse);

  if (testingResponse !== undefined) {
    const addUserQuery = `DELETE FROM masseges WHERE id=?`;
    try {
      const dbResponse = await db.run(addUserQuery, [postId]);

      response.json({ message: "Post Deleted Successfully" });
    } catch (error) {
      console.error("Error inserting user:", error.message);
      response
        .status(500)
        .json({ message: "An error occurred while signing up" });
    }
  } else {
    response.send({ message: "post not exist" });
  }
});

app.get("/API/posts/:userId", async (request, response) => {
  const { userId } = request.params;

  //   console.log(userId);
  const testingQuery = `SELECT * FROM masseges WHERE customerId=?`;
  const testingResponse = await db.get(testingQuery, [parseInt(userId)]);
  //   console.log(testingResponse);

  if (testingResponse !== undefined) {
    const addUserQuery = `SELECT * FROM masseges WHERE customerId=?`;
    try {
      const dbResponse = await db.all(addUserQuery, [userId]);

      response.json({ dbResponse });
    } catch (error) {
      console.error("Error inserting user:", error.message);
      response
        .status(500)
        .json({ message: "An error occurred while signing up" });
    }
  } else {
    response.send({ message: "USER did not post any posts" });
  }
});
