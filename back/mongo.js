const mongoose = require('mongoose')
require('dotenv').config()
const password = process.argv[2]

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 2) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    })
    person.save().then(result => {
        const name = result.name
        const number = result.number
        console.log('added', name, 'number', number, 'to phonebook')
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
            mongoose.connection.close()
        })
    })
}

