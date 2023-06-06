import { useState } from "react";

const Anecdote = ({ text, anecdotes, points, selected }) => (
  <div>
    <h2>{text}</h2>
    <p>{anecdotes[selected]}</p>
    <p>has {points[selected]} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const zeroArray = (len) => new Array(len).fill(0)
  const randomAnecdote = () => Math.floor( Math.random() * anecdotes.length)
  const getMaxIndex = (arr) => arr.indexOf(Math.max(...arr))

  const [selected, setSelected] = useState(randomAnecdote)
  const [points, setPoints] = useState(zeroArray(anecdotes.length))

  const handleNext = () => {
    const updatedNext = (selected + 1) % anecdotes.length
    setSelected(updatedNext)
  }

  const handleVote = () => {
    const pointsCopy = [ ...points ]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  return (
    <div>
      <Anecdote text='Anecdote of the day' anecdotes={anecdotes}
                points={points} selected={selected} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <Anecdote text='Anecdote with most votes' anecdotes={anecdotes}
                points={points} selected={getMaxIndex(points)} />
    </div>
  )
}

export default App;
