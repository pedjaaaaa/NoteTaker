const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

app.get('*',function (req, res) {
    res.redirect('/');
});

app.post("/api/notes", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    console.log(newNote);

    // // Using a RegEx Pattern to remove spaces from newCharacter
    // // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    // console.log(newCharacter);

    // characters.push(newCharacter);

    // res.json(newCharacter);
});

// app.delete("/api/notes/:id", function (req, res) {
//     res.sendFile(path.join(__dirname, "db.json"));
// });




app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
