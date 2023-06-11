
const Person = ({ person, handlePersonDeletion }) => (
    <li>
        {person.name} {person.number}
        <button onClick={handlePersonDeletion}>delete</button>
    </li>
)

export default Person