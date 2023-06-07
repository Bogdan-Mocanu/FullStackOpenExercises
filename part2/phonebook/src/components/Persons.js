import Person from './Person.js'

const Persons = ({ persons }) => (
    <ul>
      {persons.map((person) => <Person key={person.id} person={person} />)}
    </ul>
  )

export default Persons