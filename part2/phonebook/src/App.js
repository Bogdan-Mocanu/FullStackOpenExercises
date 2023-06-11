import './App.css';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios'
import personService from './services/personService';


function App() {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  

  const addPerson = (event) => {
    event.preventDefault()

    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      const updatedPerson = {...personExists, number: newNumber}
      personService.update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        })
    }
    else {
      const lastId = persons.reduce((prev, current) => prev.id > current.id ? prev : current).id
      console.log(lastId)
      const newPerson = {
        name: newName,
        number: newNumber,
        id: lastId + 1
      }

      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`do you want ro delete ${person.name}`))
    personService.deleteEntry(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
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
      <Persons persons={personsToShow} handlePersonDeletion={deletePerson}/>
    </div>
  );
}

export default App;
