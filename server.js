//Config this freakin app
require('./config/config.js');
console.log(process.env.JWT_SECRET);

// module imports
let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    _ = require('lodash');
let passport = require('passport');
//require('bootstrap');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Jonesdl_38:98TestMe25@ds127644.mlab.com:27644/todoapp').then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

// express config
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());


// !!! DEVELOPMENT ONLY (start) !!! //
// var corsOptions = {
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions))
// !!! DEVELOPMENT ONLY (end) !!! //

require('./models/todo');
const todos = require('./routes/todos');
app.use('/todos', todos);

require('./models/users');
const users = require('./routes/users');
app.use('/users', users);

var distDir = __dirname + "/dist/group-project/";
app.use(express.static(distDir));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + "/dist/group-project/"))
})


// app.post('/users', (req, res) => {
//     var body = _.pick(req.body, ['email', 'password']);
//     var user = new User(body);

//     user.save().then(() => {
//       return user.generateAuthToken();
//     }).then((token) => {
//       res.header('x-auth', token).send(user);
//     }).catch((e) => {
//       res.status(400).send(e);
//     })
//   });

// app.get('/users/me', authenticate, (req, res) => {
//     res.send(req.user);
//   });

// app.post('/users/login', (req, res) => {
//     var body = _.pick(req.body, ['email', 'password']);

//     User.findByCredentials(body.email, body.password).then((user) => {
//       return user.generateAuthToken().then((token) => {
//         res.header('x-auth', token).send(user);
//       });
//     }).catch((e) => {
//       res.status(400).send();
//     });
//   });

// app.delete('/users/me/token', authenticate, (req, res) => {
//     req.user.removeToken(req.token).then(() => {
//       res.status(200).send();
//     }, () => {
//       res.status(400).send();
//     });
//    });

// module.exports = {app};

//server config
app.listen(process.env.PORT || 8080);

// installed Passport
