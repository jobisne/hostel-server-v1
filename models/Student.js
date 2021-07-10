const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
        childname: String,
        klass: String,
        age: String,
        sin: String,
        gender: String,
        state: String,
        childstatus: String,
        healthstatus: String,
        hostelName: String,
        quranStatus: String,
        image: String,
        relationshipone: String,
        fname: String,
        foccupation: String,
        fphone: String,
        faddress: String,
        relationshiptwo: String,
        sname: String,
        soccupation: String,
        sphone: String,
        saddress: String,
        iname: String,
        iphone: String,
        createdAt: String
})

module.exports  = model ('Student', studentSchema)