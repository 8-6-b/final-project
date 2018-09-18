// module imports
let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

let passport = require('passport');

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

//require('./models/todos');
//const todos = require('./routes/todos');
//app.use('/todos', todos);

// Bring in the routes
let setRoutes = require('./routes/routes');
setRoutes(app);

require('./models/users');
const users = require('./routes/users');
app.use('/users', users);



var distDir = __dirname + "/dist/group-project/";
app.use(express.static(distDir));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + "/dist/group-project/"))
})

// server config
//app.listen(process.env.PORT || 8080);

var port = process.env.PORT || 8080;
var server = app.listen(function(){
    console.log('Listening on port ' + port);
});
