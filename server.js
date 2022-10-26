require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // middleware that append a body property in the request

let books = [
  {
    id: 1,
    title: "La hojarasca",
    description: "Good one",
    author: "Gabo",
  },
  {
    id: 2,
    title: "El coronel no tiene quien le escriba",
    description: "Interesting",
    author: "Gabo",
  },
];

app.get("/api/v1/books", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: books,
    });
  } catch (error) {
    console.log("Error fetching all restaurants");
    res.status(500).json({
      status: "failure",
      data: [],
    });
  }
});

app.get("/api/v1/book/:id", async (req, res) => {
  try {
    const book = books.find((book) => book.id == req.params.id);
    // console.log(results.rows);
    res.status(200).json({
      status: "success",
      data: book ? book : {},
    });
  } catch (error) {}
});

// CREATE
app.post("/api/v1/books", async (req, res) => {
  // console.log("req: ", req.body);

  try {
    const { title, description, author } = req.body;
    books.push({
      id: Math.random() * 10000000,
      title,
      description,
      author,
    });
    // console.log("create results: ", results);
    res.status(201).json({
      status: "success",
      data: books,
    });
  } catch (error) {}
});

// UPDATE
app.put("/api/v1/books/:id", async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const book = books.find((b) => b.id == req.params.id);
    (book.title = title), (book.description = description);
    book.author = author;

    res.status(200).json({
      status: "success",
      data: book,
    });
  } catch (error) {
    console.log("Error trying to update item: ", error);
  }
});

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    books = books.filter(b => b.id !== req.params.id)
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log("Error trying to delete item: ", error);
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Express server listening at port ${PORT}`);
});
