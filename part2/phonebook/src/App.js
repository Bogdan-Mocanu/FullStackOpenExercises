import './App.css';
import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService';
import Notification from './components/Notification';



function App() {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const defaultNotification = { 
    message: null,
    type: 'notification-default'
  }
  const [notification, setNotification] = useState(defaultNotification)

  console.log(notification)

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
  
  const updatePerson = (person) => {
    personService.update(person.id, person)
        .then(returnedPerson => {
          setNotification({...notification, 
            message: `${person.name} number updated`,
            type: 'notification-update'
          })
          setTimeout(() => setNotification(defaultNotification), 5000)
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        })
        .catch(error => {
          setNotification({...notification, 
            message: `Information of ${person.name} was already deleted from server`,
            type: 'notification-error'
          })
          setTimeout(() => setNotification(defaultNotification), 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)
    if (person) {
      if (
        window.confirm(
        `${person.name} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const updatedPerson = {...person, number: newNumber}
        updatePerson(updatedPerson)
      } 
    }
    else {
      const lastId = persons.reduce((prev, current) => prev.id > current.id ? prev : current).id
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
          setNotification({...notification, 
            message: `Added '${returnedPerson.name}'`,
            type: 'notification-add'
          })
          setTimeout(() => {
            setNotification(defaultNotification)
          }, 5000)
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`do you want to delete ${person.name}`))
    personService.deleteEntry(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <PersonForm newName={newName} newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handlePersonDeletion={deletePerson}/>
    </div>
  );
}

export default App;
