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
mongoose.connect('mongodb://admin:admin@ds149491.mlab.com:49491/codercamps_tshurley').then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

// express config
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());


// !!! DEVELOPMENT ONLY (start) !!! //
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
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

//server config
app.listen(process.env.PORT || 8080);
