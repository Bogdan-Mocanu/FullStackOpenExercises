import Person from './Person.js'

const Persons = ({ filter, persons, handlePersonDeletion }) => {

  const personsToShow = filter === ''
  ? persons
  : persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  return(
    <ul>
      {personsToShow.map((person) => <Person key={person.id} person={person} handlePersonDeletion={() => handlePersonDeletion(person.id)} />)}
    </ul>
  )
}

export default Persons