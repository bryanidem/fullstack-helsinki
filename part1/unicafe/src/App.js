import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        <strong>{text}: </strong>
      </td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div className="statistics">
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState("0");

  const handleGood = () => {
    const newGood = good + 1;
    const newScore = score + 1;
    const newTotal = total + 1;
    setGood(newGood);
    setTotal(newTotal);
    setScore(newScore);
    setAverage(newScore / newTotal);
    setPositive(`${newGood / newTotal} %`);
  };
  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    const newTotal = total + 1;
    setNeutral(newNeutral);
    setTotal(newTotal);
    setAverage(score / newTotal);
    setPositive(`${good / newTotal} %`);
  };
  const handleBad = () => {
    const newBad = bad + 1;
    const newScore = score - 1;
    const newTotal = total + 1;
    setBad(newBad);
    setTotal(newTotal);
    setScore(newScore);
    setAverage(newScore / newTotal);
    setPositive(`${good / newTotal} %`);
  };

  const calculateAverage = (arr, total) =>
    arr.reduce((a, b) => a + b) / arr.length();

  return (
    <>
      <h1>Give feedback</h1>
      <div className="buttons">
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
