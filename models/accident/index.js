const mongoose = require('mongoose');
const schema = require('./schema');

const Accidents = mongoose.model('Accidents', schema);

module.exports = Accidents;