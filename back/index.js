const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())

morgan.token('person', function (req, res) { return JSON.stringify(req.body) })

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const page = `<p>Phonebook has info for ${persons.length} people</p>
                  <p>${Date()}</p>`

    response.send(page)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    }
    response.status(404).end()
    console.log(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const id = Math.random()*10000000
    const name = request.body.name
    const number = request.body.number

    if (!number || !name) {
        return response.status(400).json({
            error: "Both name and number must be given"
        })
    } else {
        if (persons.find(person => person.name === name)) {
            return response.status(400).json({
                error: "Name must be unique"
            })
        }
    }

    const newPerson = {
        "id": id,
        "name": name,
        "number": number
    }
    persons.push(newPerson)
    response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})