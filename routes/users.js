//routes/users.js
const express = require('express');
let mongoose = require('mongoose');
//const router = express.Router();
const _ = require('lodash');
var app = express();
var authenticate = require('../middleware/authenticate');

let User = mongoose.model('User');

app.post('/', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
  
    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch((e) => {
      console.log(e);
      res.status(400).send(e);
    })
  });
  
  app.get('/me', authenticate, (req, res) => {
    res.send(req.user);
  });
  
  app.post('/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
  
    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      res.status(400).send();
    });
  });
  
  app.delete('/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }, () => {
      res.status(400).send();
    });
  });

  module.exports = app;

// router.post('/signup', (req, res) => {
//     let newUser = new User();
//     newUser.email = req.body.email;
//     newUser.setPassword(req.body.password);
//     newUser.save((err) => {
//         if(err) {
//             res.send(err);
//         } else {
//             res.json({token: newUser.generateJWT()})
//         }
//     })
// })

// router.post('/login', ((req, res) => {
//     User.findOne({email: req.body.email}, ((err, user) => {
//         if(err) {
//             res.sendStatus(500)
//         } else {
//             if(user.validatePassword(req.body.password)) {
//                 res.json({token: user.generateJWT()})
//             } else {
//                 res.json('Incorrect Password')
//             }
//         }
//     }))
// }))
//
//module.exports = router;