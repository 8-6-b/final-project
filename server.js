// module imports
const express = require('express');
const path = require('path');
let mongoose = require('mongoose');
let passport = require('passport');
const bodyParser = require("body-parser");
const cors = require('cors')

mongoose.connect('mongodb://chris:123456a@ds121262.mlab.com:21262/team86-db');

// express config
const app = express();
app.use(bodyParser.json())
app.use(passport.initialize());

// // !!! DEVELOPMENT ONLY (start) !!! //

// var corsOptions = {
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions))

// // !!! DEVELOPMENT ONLY (end) !!! //

require('./models/todos');
require('./models/user');
const todos = require('./routes/todos');
const users = require('./routes/users');
app.use('/todos', todos);
app.use('/users', users);

var distDir = __dirname + "/dist/group-project/";
app.use(express.static(distDir));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + "/dist/group-project/"))
})

// server config
app.listen(process.env.PORT || 8080);
