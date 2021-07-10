const { Schema, model } = require('mongoose');

const registerSchema = new Schema({
    masterName: String,
    hostelName: String,
    password: String,
    createdAt: String
})

module.exports = model('User', registerSchema);