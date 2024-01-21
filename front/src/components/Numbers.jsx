const Person = ({ id, name, number, person, deletePerson }) => {
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{number}</td>
      <td>
        <button onClick={() => deletePerson(person)}>delete</button>
      </td>
    </tr>
  )
}

const Numbers = ({ persons, nameContains, deletePerson }) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(nameContains.toLowerCase()))
    return (
      <>
        <h2>Numbers</h2>
        <table>
        <tbody>
          {filtered.map(person =>
            <Person 
              key={person.id}
              id={person.id}
              name={person.name}
              number={person.number}
              person={person}
              deletePerson={deletePerson}
            />
          )}
        </tbody>
        </table>
      </>
    )
  }

export default Numbers