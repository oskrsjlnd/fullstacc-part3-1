const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())

morgan.token('person', function (req, res) { return JSON.stringify(req.body) })

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(result => {
            console.log(result)
            const persons = result
            res.json(persons)
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    Person.find({})
        .then(people => {
            const page = `<p>Phonebook has info for ${people.length} people.</p>
                          <p>${Date()}</p>`
            res.send(page)
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(result => {
            console.log(result)
            if (result) {
                res.json(result)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const newPerson = new Person({
        "name": req.body.name,
        "number": req.body.number
    })
    const testRes = /(\d{2}-\d{6,})|(\d{3}-\d{5,})/.test(newPerson.number)
    console.log(testRes)
    newPerson.save()
        .then(result => {
            console.log('Created:', result)
            res.json(newPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const newPerson = {
        name: req.body.name,
        number: req.body.number
    }

    Person.findByIdAndUpdate(
        req.params.id,
        newPerson,
        { new: true, runValidators: true, context: 'query' })
        .then(person => {
            res.json(person)
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.log('Error in backend:', error)
    if (error.name === 'CastError') {
        return res.send({ error: 'Format of the given id is incorrect.'})
    } else if (error.name === 'ValidationError') {
        console.log(error.message)
        return res.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})