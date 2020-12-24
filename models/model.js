
const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    history: Array,
    favourites: Array,
    items: Array
})


const UserModel = mongoose.model('storage',UserSchema)

module.exports = UserModel