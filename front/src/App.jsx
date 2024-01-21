import { useState, useEffect} from 'react'
import Numbers from './components/Numbers'
import AddNew from './components/AddNew'
import Filter from './components/Filter'
import Notification from './components/Notification'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameContains, setNameContains] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    contactService
      .fetchPersons()
      .then(fetchedPersons => {
        setPersons(fetchedPersons)
      })
  }, [])

  const showNotification = (content) => {
    setNotification(content)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const submitPerson = (event) => {
    event.preventDefault()
    
    const updatePerson = (person) => {
      if (window.confirm(`Do you want to update the number for ${person.name}`)) {
        const updated = {...person, number: newNumber}
        contactService
          .updateNumber(person.id, updated)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id
              ? {...person, number: newNumber}
              : person)
            )
            return returnedPerson
          })
          .then((returnedPerson) => {
            showNotification(`Updated ${returnedPerson.name} successfully`)
            return returnedPerson
          })
          .catch(error => {
            showNotification(`Updating ${returnedPerson.name} was unsuccessful`)
          })
      }
    }
        const newPerson = {
          name: newName,
          number: newNumber
        }
        const creating = persons.find(person => person.name === newName)
        if (creating) {
          updatePerson(creating)
        } else {
          contactService
          .newPerson(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            return returnedPerson
          })
          .then(person => {
            showNotification(`Created ${person.name} successfully`)
            return person
          })
          .catch(error => {
            showNotification(`Creating ${person.name} was unsuccessful`)
          })
          setNewName('')
          setNewNumber('')
        }
    }
  
  const deletePerson = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      contactService
      .deletePerson(person.id)
      .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
          showNotification(`${person.name} was deleted`)
        })
        .catch(error => {
          showNotification(`${person.name} could not be deleted.`)
        })
    }
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNameContains(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter 
        nameContains={nameContains}
        handleFilterChange={handleFilterChange} 
      />
      <AddNew
        persons={persons} 
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        submitPerson={submitPerson} 
      />
      <Numbers
        persons={persons} 
        nameContains={nameContains} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App