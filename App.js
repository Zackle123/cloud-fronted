import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    ffetch(`${process.env.REACT_APP_API_URL}/questions`)
      .then(res => res.json())
      .then(setQuestions);
  }, []);

  const handleChange = (qid, index) => {
    setAnswers({ ...answers, [qid]: index });
  };

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then(res => res.json())
      .then(setResult);
  };

  if (result) return (
    <div className="App">
      <h2>You scored {result.score} / {result.total}</h2>
    </div>
  );

  return (
    <div className="App">
      <h1>Simple Quiz</h1>
      {questions.map(q => (
        <div key={q.id}>
          <h3>{q.question}</h3>
          {q.options.map((opt, idx) => (
            <label key={idx}>
              <input
                type="radio"
                name={`q-${q.id}`}
                onChange={() => handleChange(q.id, idx)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
