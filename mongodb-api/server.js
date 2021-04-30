const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Users = require('./api/users');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/users', Users);

mongoose.connect("mongodb+srv://Jonaiasenza:260398kpo@users-db.mmxog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || 'mongodb://localhost/users',
    { useNewUrlParse: true},
    (err, res ) => {
        err && console.log('Error');
        app.listen(process.env.PORT || 4000, () => {
            console.log("Connected")
        });
    }
);




