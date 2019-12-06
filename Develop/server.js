const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const jsonData = require("./db/db.json");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

const app = express();
const PORT = process.env.PORT || 3000;
let noteArray;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get('*', function (req, res) {
    res.redirect('/');
});

app.post("/api/notes", function (req, res) {

    res.send("Post received!");

    const newNote = req.body;

    readFileAsync(path.join(__dirname, "./db/db.json"), "utf8")
        .then(function (data) {
            noteArray = JSON.parse(data);
            if (newNote.id || newNote.id === 0) {
                let currentNote = noteArray[newNote.id];
                currentNote.title = newNote.title;
                currentNote.text = newNote.text;
            } else {
                noteArray.push(newNote);
            }
            writeFileAsync(path.join(__dirname, "./db/db.json"), JSON.stringify(noteArray))
                .then(function () {
                    console.log("Wrote note to JSON file.");
                })
        });
    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {

});


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
