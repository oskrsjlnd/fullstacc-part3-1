import axios from 'axios'
const baseUrl = '/api/persons'

const fetchPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const newPerson = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default { fetchPersons, newPerson, deletePerson, updateNumber }