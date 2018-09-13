// module imports
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require("body-parser");
//const cors = require('cors')
mongoose.connect('mongodb://chris:123456a@ds121262.mlab.com:21262/team86-db');
// express config
const app = express();
app.use(bodyParser.json())
app.use(passport.initialize());

// !!! DEVELOPMENT ONLY (start) !!! //

// <<<<<<< HEAD
// var corsOptions = {
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200
// }
//
// app.use(cors(corsOptions))
// =======
// var corsOptions = {
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions))
// >>>>>>> 44664b18efbf7b095d9ea936220262ebd7fcbc94

// !!! DEVELOPMENT ONLY (end) !!! //
require('./models/todo');
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

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});


// server config
app.listen(process.env.PORT || 8080);
