let mongoose = require('mongoose');

let choreSchema = new mongoose.Schema({
  name: String
}, { collection: 'chores'});

let Chore = mongoose.model('Chore', choreSchema);

module.exports = Chore;
