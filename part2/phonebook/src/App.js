import './App.css';
import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';



function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const personsToShow = filter === ''
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm newName={newName} newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
}

export default App;
