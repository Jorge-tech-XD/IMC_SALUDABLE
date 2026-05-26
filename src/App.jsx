import { useState } from "react";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  function calculateBMI() {
    if (!weight || !height || !age) {
      alert("Completa todos los campos");
      return;
    }

    const result = weight / (height * height);

    setBmi(result.toFixed(1));

    if (result < 18.5) {
      setCategory("Bajo peso");
    } else if (result < 25) {
      setCategory("Peso normal");
    } else if (result < 30) {
      setCategory("Sobrepeso");
    } else {
      setCategory("Obesidad");
    }
  }

  const indicatorPosition = bmi
    ? Math.min((bmi / 40) * 100, 100)
    : 0;

  return (
    <div className="container">
      <h1>Calculadora IMC</h1>

      <div className="form">
        <input
          type="number"
          placeholder="Peso (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Estatura (m)"
          step="0.01"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Edad"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button onClick={calculateBMI}>
          Calcular IMC
        </button>
      </div>

      {bmi && (
        <>
          <div className="result-card">
            <h2>Tu IMC es:</h2>

            <h1>{bmi}</h1>

            <p>{category}</p>
          </div>

          <div className="bar-container">
            <div className="bar">
              <div
                className="indicator"
                style={{
                  left: `${indicatorPosition}%`,
                }}
              ></div>
            </div>

            <div className="labels">
              <span>Bajo</span>
              <span>Normal</span>
              <span>Sobrepeso</span>
              <span>Obesidad</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;