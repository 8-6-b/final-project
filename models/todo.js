let mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  name: String,
  id: Number
});

let Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
