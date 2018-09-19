let mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  description: String
});

let Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;
