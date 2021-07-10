const { model, Schema } = require('mongoose');

const hostelSchema = new Schema({
        hostelName: String,
        hostelMaster: String,
        hostelImage: String,
        hostelDesc: String,
        yearEstablish: String,
        createdAt: String
})

module.exports = model( 'Hostel', hostelSchema);