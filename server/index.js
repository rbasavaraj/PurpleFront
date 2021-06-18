const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const md5 = require('md5');
const app = express();
const { body, validationResult } = require('express-validator');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'purplefrontdb',
});

db.connect(function (error) {
    if (!!error) {
        console.log('Error');
    } else {
        console.log('Connected');
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register",
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({
        min: 8
    }),
    body('phnumber').isNumeric().isLength({
        min:10,
    }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        else {
            const fname = req.body.fname;
            const email = req.body.email;
            const password = md5(req.body.password);
            const phnumber = req.body.phnumber;
            console.log(phnumber);
            const sqlInsert = "INSERT INTO userdetails (name, email, password, phnumber) VALUES (?,?,?,?)"
            db.query(sqlInsert, [fname, email, password, phnumber], (err, result) => {
                console.log(err);
            });
        }

        res.status(200).json({
            success: true,
            message: 'Registered successful',
        })
    });

app.post("/api/login",
    body('email').isEmail().normalizeEmail(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors);
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        else {
            const email = req.body.email;
            const password = md5(req.body.password);
            const sqlSelect = "SELECT * FROM userdetails WHERE email=? AND password=?";
            db.query(sqlSelect, [email, password], (err, result) => {
                if(err){
                    res.sen({ err: err })
                }
                if(result.length > 0){
                    res.send(result);
                }
                else{
                    res.send({ message: "Username and Password mismatch"} );
                }
            });
        }
    });
    
app.listen(3001, () => {
    console.log("3001");
});