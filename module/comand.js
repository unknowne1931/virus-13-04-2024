const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    name : String,
    data : String,
    cmd : String
});

module.exports = mongoose.model('Command', CommandSchema);
