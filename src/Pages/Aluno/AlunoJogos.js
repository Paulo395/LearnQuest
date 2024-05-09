import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlunoJogos.css'; // Importando o arquivo CSS

const AlunoJogos = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [respostasDadas, setRespostasDadas] = useState([]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await axios.get('https://localhost:7243/api/Disciplina');
        setDisciplinas(response.data);
      } catch (error) {
        console.error('Erro ao carregar disciplinas:', error);
      }
    };

    fetchDisciplinas();
  }, []);

  const handleDisciplinaClick = (disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setPerguntaIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setRespostasDadas(Array(disciplina.perguntas.length).fill(false)); // Inicializa o array de respostas dadas
  };

  const handleProximaPergunta = () => {
    if (perguntaIndex < disciplinaSelecionada.perguntas.length - 1) {
      setPerguntaIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRespostaClick = (isCorrect) => {
    if (!respostasDadas[perguntaIndex]) { // Verifica se a pergunta ainda não foi respondida
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1); // Incrementa a pontuação apenas se a resposta for correta
      }
      const newRespostasDadas = [...respostasDadas];
      newRespostasDadas[perguntaIndex] = true; // Marca a pergunta como respondida
      setRespostasDadas(newRespostasDadas);
    }
  };

  const handleVoltarInicio = () => {
    setDisciplinaSelecionada(null);
    setPerguntaIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setRespostasDadas([]);
  };

  return (
    <div className="aluno-jogos-container">
      <h2>Jogos do Aluno</h2>
      {!disciplinaSelecionada ? (
        <div className="disciplinas-container">
          {disciplinas.map((disciplina) => (
            <div key={disciplina.id} className="disciplina-card">
              <h3>{disciplina.nome}</h3>
              <button onClick={() => handleDisciplinaClick(disciplina)}>Começar</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="perguntas-container">
          {quizCompleted ? (
            <div>
              <p>Parabéns! Você completou o quiz.</p>
              <p>Pontuação: {score} de {disciplinaSelecionada.perguntas.length}</p>
              <button onClick={handleVoltarInicio}>Voltar ao Início</button>
            </div>
          ) : (
            <div>
              <p>{disciplinaSelecionada.perguntas[perguntaIndex].titulo}</p>
              <ul>
                {disciplinaSelecionada.perguntas[perguntaIndex].respostas.map((resposta, index) => (
                  <li key={index} onClick={() => handleRespostaClick(resposta.correta)}>
                    <button>{resposta.alternativa}</button>
                  </li>
                ))}
              </ul>
              <button onClick={handleProximaPergunta}>Próxima Pergunta</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlunoJogos;
