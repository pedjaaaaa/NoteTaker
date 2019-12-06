const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const jsonData = require("./db/db.json");

const writefileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const app = express();
const PORT = process.env.PORT || 3000;
const noteArray = [];

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
    
    // console.log(newNote);
    noteArray.push(newNote);
    console.log(noteArray);

    readFileAsync()

    // jsonfile.writeFileSync("./db/db.json", newNote, { spaces: 2, EOL: '\r\n'})

});

app.delete("/api/notes/:id", function (req, res) {

});
    // appendjson(newNote, "./db/db.json", function() {
    //     console.log("Added to json file.")
    // })
    // newNote.save()
    //     .then(item => {
    //         res.send("item saved to database");
    //     })
    //     .catch(err => {
    //         res.status(400).send("unable to save to database");
    //     });
// });

    // // Using a RegEx Pattern to remove spaces from newCharacter
    // // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    // console.log(newCharacter);

    // characters.push(newCharacter);

    // res.json(newCharacter);
// });



app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
