import Person from './Person.js'

const Persons = ({ persons, handlePersonDeletion }) => (
    <ul>
      {persons.map((person) => <Person key={person.id} person={person} handlePersonDeletion={() => handlePersonDeletion(person.id)} />)}
    </ul>
  )

export default Persons