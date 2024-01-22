const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
    .then(result => {
        console.log('Connected to database')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true,
        minLength: 3
    }
}) 

personSchema.set('toJSON', {
    transform: (document, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
    }
})

module.exports = mongoose.model('Person', personSchema)