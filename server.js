const mysql = require('mysql');
const express = require('express');
const server = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "student",
    database: "dog"
});

db.connect(function (err) {
    if (err) throw err;
});

//ROUTES
server.get("/createTable", function (req, res) {
    console.log("hitting create table route")
    let sql = "CREATE TABLE post(ID int NOT NULL AUTO_INCREMENT, title varchar(255), body TEXT, PRIMARY KEY (KEY));"
    db.query(sql, function (err, results) {
        if (err) throw err;
        res.send("CREATED TABLE POST")
    });
});

server.get('/post1/:', function (req, res) {
    let post = { title: "My first db encounter", body: "The teacher told me how to do sql injection judge." }
    let sql = 'INSERT INTO post SET ?';
    db.query(sql, post, function (err, result) {
        if (err) throw err;
        res.send("added second record");
    });
});

server.get("/delete_post/:id", function (req, res) {
    console.log(req.params.id);
    let sql = "DELETE FROM post WHERE ID=" + req.params.id
    db.query(sql, function (err, result) {
        if (err) throw err;
        res.send("delete a post");
    });
});

server.listen(3000, function () {
    console.log("server is up on port 3000");


});