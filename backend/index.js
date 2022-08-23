const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const posts = require("./models/postSchema");
const users = require("./models/userSchema");
require("dotenv").config();
// const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const uri =
  "mongodb+srv://madhu:WgGZrm8bcHqGvNqT@cluster0.enjyahi.mongodb.net/instagram?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to the instagram database with the collection");
  } catch (err) {
    console.log(err);
  }
}

connect();
const db = `process.env.${uri}`;

app.listen(PORT, () => console.log(`server is running on port : ${PORT}`));

//////////////////////////////////////////////////////////////

app.post("/login", async (req, res) => {
  let data = { email: req.body.email };
  // let userEmailDB = await users.find({ email: data });
  // console.log(userEmailDB);
  const token = jwt.sign({ data }, "jwtSecretKey");
  res.status(200).json({ token: token, email: data.email });
});

//////////////////////////////////////////////////////////////
app.post("/createPost", async (req, res) => {
  const { userName, caption, imageUrl } = req.body;
  if (!userName || !caption || !imageUrl) {
    res.status(404).send("please fill the details now");
  }

  try {
    const addPost = new posts({ userName, caption, imageUrl });
    await addPost.save();
    res.status(201).json(addPost);
    console.log(addPost);
  } catch (err) {
    res.status(404).send(err);
  }
});

////////////////////////////////////////////////////////////
app.get("/getPosts", async (req, res) => {
  try {
    const postDetails = await posts.find();
    res.status(200).json(postDetails);
    // console.log(postDetails);
  } catch (err) {
    console.log(err.message);
  }
});

///////////////////////////////////////////////////////////
app.post("/registerUser", async (req, res) => {
  const { userName, password, email } = req.body;
  if (!userName || !password || !email) {
    res.status(402).send("please enter the valid credentials to create a user");
  }
  try {
    const newUser = new users({ userName, email, password });
    await newUser.save();
    res.status(201).json(newUser);
    console.log(newUser);
  } catch (err) {
    console.log(err);
  }
});
