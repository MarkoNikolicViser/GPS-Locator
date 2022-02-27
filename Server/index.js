const express = require('express');
const app = express()
const cors = require('cors')
const mysql = require('mysql')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = 3001;

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '1337',
    database: 'mobilnilokator2'
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sqlGet = "SELECT user.id,user.email,user.name,user.share,user.pinColor,location.locationId FROM user JOIN location WHERE user.id=location.userId AND user.email=? AND user.password=?"
    //const sqlGet = "SELECT * FROM user WHERE email=? AND password=?";
    db.query(sqlGet, [email, password], (err, result) => {
        if (err) {
            res.send({ message: err })
        }
        else {
            res.send(result);
        }
    });
});
app.post("/register", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const pinColor = req.body.pinColor;
    const sqlInsert = "INSERT INTO user (name,email,password,pinColor) VALUES (?,?,?,?)";
    db.query(sqlInsert, [name, email, password, pinColor], (err, result) => {
        if (err) {
            res.send({ err: err })
        }
        else {
            res.send({ userId: result.insertId });
        }
    });
});
app.post("/user/get", (req, res) => {
    const id = req.body.id;
    const sqlGet = "SELECT * FROM user WHERE id=?";
    db.query(sqlGet, id, (err, result) => {
        if (err) {
            res.send({ message: err })
        }
        else {
            res.send(result);
        }
    });
});
app.post("/location/update", (req, res) => {
    const userId = req.body.userId
    const locationX = req.body.locationX
    const locationY = req.body.locationY
    const sqlUpdate = "UPDATE location SET locationX=?,locationY=? WHERE userId=?";
    db.query(sqlUpdate, [locationX, locationY, userId], (err, result) => {
        if (err) {
            res.send({ err: err })
        } else {
            res.json({ message: 'updated location' });
        }
    });
});
app.post("/constraints/insert", (req, res) => {
    const userId = req.body.userId;
    const locationId = req.body.locationId;
    const sqlInsert = "INSERT INTO constraints (userId,locationId) VALUES(?,?)";
    db.query(sqlInsert, [userId, locationId], (err, result) => {
        if (err) {
            res.send({ err: err })
        }
        else {
            res.send({ message: 'alowed access' });
        }
    });
});
app.post("/constraints/update", (req, res) => {
    const id = req.body.id;
    const allow = req.body.allow;
    const sqlInsert = "UPDATE constraints SET allow=? WHERE id=?";
    db.query(sqlInsert, [allow, id], (err, result) => {
        if (err) {
            res.send({ err: err })
        }
        else {
            res.send({ message: 'allowed/unallowed' });
        }
    });
});
app.post("/constraints/check", (req, res) => {
    const locationId = req.body.locationId;
    const userId = req.body.userId;
    const sqlGet = "SELECT * FROM constraints WHERE locationId=? AND userId=?";
    db.query(sqlGet, [locationId, userId], (err, result) => {
        if (err) {
            res.send({ message: err })
        }
        else {
            res.send(result);
        }
    });
});
app.post("/constraints/getall", (req, res) => {
    const locationId = req.body.locationId;
    const sqlGet = "SELECT user.email, user.name, constraints.id,constraints.allow FROM user JOIN constraints WHERE locationId=? AND user.id=constraints.userId";
    db.query(sqlGet, locationId, (err, result) => {
        if (err) {
            res.send({ message: err })
        }
        else {
            res.send(result);
        }
    });
});
app.post("/insert/location", (req, res) => {
    const userId = req.body.userId;
    const sqlInsert = "INSERT INTO location (userId) VALUES(?)";
    db.query(sqlInsert, userId, (err, result) => {
        if (err) {
            res.send({ err: err })
        }
        else {
            res.send({ idUser: result.insertId });
        }
    });
});
app.post("/tracer", (req, res) => {
    const userId = req.body.userId;
    const sqlGet = "SELECT constraints.id,user.email,user.name,user.pinColor,constraints.allow, location.locationX,location.locationY,location.time FROM constraints JOIN location JOIN user WHERE location.locationId=constraints.locationId AND constraints.userId = ? AND user.id=location.userId";
    db.query(sqlGet, userId, (err, result) => {
        if (err) {
            res.send({ message: err })
        }
        else {
            res.send(result);
        }
    });
});
app.listen(port)