const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    rol: {
        type: String,
        default: "usuario"
    }
})

module.exports = mongoose.model('User', schema, 'users')