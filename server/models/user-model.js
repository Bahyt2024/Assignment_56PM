const {Schema, model} = require('mongoose')

const USerSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},

    activationLink: {type: String,  required: true},


})

module.exports = model('U ser', USerSchema)