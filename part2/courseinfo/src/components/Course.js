
const Header = ({ name }) => {
    return <h1>{name}</h1>
  }
  
  const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
  )
  
  const Content = ({ parts }) => (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )

  const Total = ({ course }) => {
    const exerciseList = course.parts.map((x) => x.exercises)
    const total = exerciseList.reduce((partialSum, a) => partialSum + a, 0)
    return (
      <p>Number of exercises {total}</p>
    )
  }
  
  const Course = ({ course }) => (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total course={course} />
    </div>
  )
  
  export default Course