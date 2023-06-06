import { useState } from 'react';

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, bad, neutral}) => {
  
  const total = good + bad + neutral
  const calculateAverage = () => Math.round((good - bad) / total * 100) / 100
  const calculatePositive = () => Math.round(good / total * 100 * 100) / 100

  if (total === 0) {
    return <div>No feedback given</div>
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='total' value={total}/>
        <StatisticLine text='average' value={calculateAverage()}/>
        <StatisticLine text='positive' value={calculatePositive()}/>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }  

  return (
    <div>
      <h3>Give feedback</h3>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h3>statistics</h3>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App;
