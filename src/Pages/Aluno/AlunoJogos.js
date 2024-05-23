import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlunoJogos.css'; // Importando o arquivo CSS

const AlunoJogos = ({ alunoId }) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [respostasDadas, setRespostasDadas] = useState([]);
  const [turmaId, setTurmaId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarTurmaId = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/usuario/${alunoId}`);
        const aluno = response.data;

        if (aluno.turmaId !== null) {
          setTurmaId(aluno.turmaId);
        } else {
          setError('Você não está associado a nenhuma turma.');
        }
      } catch (error) {
        console.error('Erro ao obter aluno:', error);
        setError('Erro ao carregar as informações do aluno.');
      }
    };

    carregarTurmaId();
  }, [alunoId]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        if (turmaId !== null) {
          const response = await axios.get(`https://localhost:7243/api/Disciplina?turmaId=${turmaId}`);
          setDisciplinas(response.data);
        } else {
          setDisciplinas([]);
        }
      } catch (error) {
        console.error('Erro ao carregar disciplinas:', error);
      }
    };

    fetchDisciplinas();
  }, [turmaId]);

  const handleDisciplinaClick = (disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setPerguntaIndex(0);
    setScore(0);
    setQuizCompleted(false);
    setRespostasDadas(Array(disciplina.perguntas.length).fill(false));
  };

  const handleProximaPergunta = () => {
    if (perguntaIndex < disciplinaSelecionada.perguntas.length - 1) {
      setPerguntaIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
      enviarNota(score);
    }
  };

  const handleRespostaClick = (isCorrect) => {
    if (!respostasDadas[perguntaIndex]) {
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      const newRespostasDadas = [...respostasDadas];
      newRespostasDadas[perguntaIndex] = true;
      setRespostasDadas(newRespostasDadas);
    }
  };

  const enviarNota = async (score) => {
    try {
      const response = await axios.post('https://localhost:7243/api/Nota', {
        alunoId: alunoId,
        disciplinaId: disciplinaSelecionada.id,
        pontuacao: score,
        data: new Date().toISOString()
      });
      console.log('Nota enviada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar nota:', error);
      setError('Erro ao enviar nota.');
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
        <div className="quiz-container">
          {quizCompleted ? (
            <div className="resultado-quiz">
              <p>Parabéns! Você completou o quiz.</p>
              <p>Pontuação: {score} de {disciplinaSelecionada.perguntas.length}</p>
              <button onClick={handleVoltarInicio}>Voltar ao Início</button>
            </div>
          ) : (
            <div className="pergunta-ativa">
              <p><strong>Pergunta:</strong> {disciplinaSelecionada.perguntas[perguntaIndex].titulo}</p>
              {disciplinaSelecionada.perguntas[perguntaIndex].respostas.map((resposta, index) => (
                <button key={index} onClick={() => handleRespostaClick(resposta.correta)} className="resposta-btn">
                  {resposta.alternativa}
                </button>
              ))}
              <button onClick={handleProximaPergunta} className="proximo-btn">Próxima Pergunta</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlunoJogos;
