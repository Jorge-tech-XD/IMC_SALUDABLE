import { useState } from "react";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [report, setReport] = useState(null);

  function handleCalculate(e) {
    e.preventDefault();

    if (!name || !weight || !height || !age) {
      alert(
        "Por favor, completa todos los campos para generar el reporte médico."
      );
      return;
    }

    const bmiResult = (weight / (height * height)).toFixed(1);
    let categoryResult = "";
    let recommendation = "";

    if (bmiResult < 18.5) {
      categoryResult = "Bajo peso ⚠️";
      recommendation =
        "Se sugiere una evaluación nutricional completa para desarrollar un plan de alimentación calórico y balanceado enfocado en ganar masa muscular de forma saludable.";
    } else if (bmiResult < 25) {
      categoryResult = "Peso normal / Saludable ✨";
      recommendation =
        "¡Excelente! El paciente se encuentra en un rango óptimo. Se recomienda mantener los hábitos alimenticios actuales y continuar con actividad física regular.";
    } else if (bmiResult < 30) {
      categoryResult = "Sobrepeso ⚠️";
      recommendation =
        "Se recomienda moderar el consumo de azúcares refinados y grasas saturadas, priorizando el consumo de verduras, proteínas magras y agua.";
    } else {
      categoryResult = "Obesidad 🚨";
      recommendation =
        "Es altamente recomendable agendar una consulta integral con un especialista en nutrición para diseñar un plan estructurado de reducción de peso.";
    }

    const indicatorPosition = Math.min(
      Math.max(((bmiResult - 15) / (40 - 15)) * 100, 0),
      100
    );

    setReport({
      name,
      weight,
      height,
      age,
      bmi: bmiResult,
      category: categoryResult,
      recommendation,
      indicatorPosition,
      date: new Date().toLocaleDateString(),
      folio: Math.floor(100000 + Math.random() * 900000),
    });
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="dashboard-container">
      {/* PANEL DE CAPTURA (Se oculta al imprimir) */}
      <div className="medical-card no-print">
        <div className="medical-header">
          <span className="medical-icon">🩺</span>
          <h1>Módulo de Diagnóstico</h1>
          <p className="subtitle">Evaluación Nutricional Antropométrica</p>
        </div>

        <form onSubmit={handleCalculate} className="form">
          <div className="input-group">
            <label>Nombre Completo del Paciente</label>
            <input
              type="text"
              placeholder="Ej: Carlos Mendoza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group-row">
            <div className="input-group">
              <label>Peso (kg)</label>
              <input
                type="number"
                placeholder="70"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Estatura (m)</label>
              <input
                type="number"
                placeholder="1.75"
                step="0.01"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Edad</label>
              <input
                type="number"
                placeholder="32"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-medical">
            Generar Reporte Clínico
          </button>
        </form>
      </div>

      {/* REPORTE CLÍNICO CON GRÁFICA */}
      <div className="report-container">
        {!report ? (
          <div className="empty-state no-print">
            <p>
              Ingresa los datos del paciente en el panel izquierdo para generar
              la hoja de resultados oficiales con su gráfica indicadora.
            </p>
          </div>
        ) : (
          <div className="printable-report">
            <div className="report-header">
              <div>
                <h2>CENTRO DE ASISTENCIA NUTRICIONAL</h2>
                <p className="report-subtitle">
                  Reporte de Composición Corporal Automatizado
                </p>
              </div>
              <div className="report-meta">
                <div>
                  <strong>Fecha:</strong> {report.date}
                </div>
                <div>
                  <strong>Folio:</strong> #{report.folio}
                </div>
              </div>
            </div>

            <hr className="report-divider" />

            {/* 1. Datos Generales */}
            <div className="report-section">
              <h3>1. Datos del Paciente</h3>
              <div className="patient-grid">
                <div>
                  <strong>Nombre:</strong> {report.name}
                </div>
                <div>
                  <strong>Edad:</strong> {report.age} años
                </div>
                <div>
                  <strong>Peso:</strong> {report.weight} kg
                </div>
                <div>
                  <strong>Estatura:</strong> {report.height} m
                </div>
              </div>
            </div>

            {/* 2. Evaluación e Gráfica Indicadora */}
            <div className="report-section">
              <h3>2. Evaluación y Gráfica Diagnóstica</h3>
              <div className="results-box">
                <div className="result-metric">
                  <span className="metric-label">
                    Índice de Masa Corporal (IMC)
                  </span>
                  <span className="metric-value">{report.bmi} kg/m²</span>
                </div>
                <div className="result-metric">
                  <span className="metric-label">
                    Clasificación Diagnóstica
                  </span>
                  <span className="metric-value category-highlight">
                    {report.category}
                  </span>
                </div>
              </div>

              {/* CONTENEDOR DE LA GRÁFICA INTERACTIVA */}
              <div className="report-bar-container">
                <div className="report-bar">
                  <div
                    className="report-indicator"
                    style={{ left: `${report.indicatorPosition}%` }}
                  >
                    <span className="arrow-label">{report.bmi}</span>
                    <div className="arrow-down"></div>
                  </div>
                </div>
                <div className="report-labels">
                  <span className="lbl-bajo">Bajo (&lt;18.5)</span>
                  <span className="lbl-normal">Normal (18.5 - 24.9)</span>
                  <span className="lbl-sobre">Sobrepeso (25 - 29.9)</span>
                  <span className="lbl-obeso">Obesidad (&ge;30)</span>
                </div>
              </div>
            </div>

            {/* 3. Observaciones */}
            <div className="report-section">
              <h3>3. Observaciones y Sugerencias Clínicas</h3>
              <div className="recommendation-box">
                <p>{report.recommendation}</p>
              </div>
            </div>

            <div className="report-footer-signature">
              <div className="signature-line"></div>
              <p>Firma y Sello del Profesional de la Salud</p>
            </div>

            {/* REFERENCIA BIBLIOGRÁFICA */}
            <div className="report-reference">
              <p>
                <strong>Fuente Confíable:</strong> Este reporte se basa en los
                estándares internacionales de clasificación del Índice de Masa
                Corporal (IMC) establecidos por la{" "}
                <strong>
                  Organización Mundial de la Salud (OMS) - World Health
                  Organization (WHO)
                </strong>
                . Las recomendaciones son guías generales y no sustituyen la
                consulta con un profesional de la salud certificado.
              </p>
            </div>

            <button onClick={handlePrint} className="btn-print no-print">
              🖨️ Imprimir / Guardar como PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;