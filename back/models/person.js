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
        required: [true, 'Number is required'],
        validate: {
            validator: function (v) {
                return /(^\d{2}-\d{6,}$)|(^\d{3}-\d{5,}$)/.test(v)
            },
            message: props => `400: ${props.value} is not a valid number.`
        }
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