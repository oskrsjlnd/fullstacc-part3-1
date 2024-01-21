const AddNew = ({ newName, newNumber, setNewName, setNewNumber, submitPerson }) => {
    return (
      <form>
        <h2>
          add a new
        </h2>
        <div>
          name: <input value={newName} onChange={({ target }) => setNewName(target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={({ target }) => setNewNumber(target.value)} />
        </div>
        <div>
          <button type="submit" onClick={submitPerson}>add</button>
        </div>
      </form>
    )
  }

export default AddNew