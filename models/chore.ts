import * as mongoose from 'mongoose';

const choreSchema = new mongoose.Schema({
    name: String
}, { collection: 'chores'});

const Chore = mongoose.model('Chore', choreSchema);

export default Chore;
