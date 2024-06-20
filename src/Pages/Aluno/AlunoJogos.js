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
  const [quizPermitted, setQuizPermitted] = useState(true);
  const [motivo, setMotivo] = useState('');
  const [activeRespostaIndex, setActiveRespostaIndex] = useState(null); // Novo estado

  useEffect(() => {
    const carregarTurmaId = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/usuario/${alunoId}`);
        const aluno = response.data;

        if (aluno.turmaId !== null && aluno.turmaId !== 0) {
          setTurmaId(aluno.turmaId);
        } else {
          setError('Você não está associado a nenhuma turma válida.');
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

  const verificarSeJaFezAtividade = async (disciplinaId) => {
    try {
      const response = await axios.get(`https://localhost:7243/api/Nota/${alunoId}`);
      const notas = response.data;
      const notaEncontrada = notas.find(nota => nota.disciplinaId === disciplinaId);
      if (notaEncontrada) {
        alert(`Você completou esta atividade em ${new Date(notaEncontrada.data).toLocaleDateString()} com uma pontuação de ${notaEncontrada.pontuacao}.`);
      }
      return !!notaEncontrada;
    } catch (error) {
      console.error('Erro ao verificar se já fez a atividade:', error);
      return false;
    }
  };

  const handleDisciplinaClick = async (disciplina) => {
    const jaFezAtividade = await verificarSeJaFezAtividade(disciplina.id);
    if (jaFezAtividade) {
      setQuizPermitted(false);
    } else {
      setDisciplinaSelecionada(disciplina);
      setPerguntaIndex(0);
      setScore(0);
      setQuizCompleted(false);
      setRespostasDadas(Array(disciplina.perguntas.length).fill(null)); // Modificação para aceitar null
      setQuizPermitted(true);
      setActiveRespostaIndex(null); // Resetar índice ativo
    }
  };

  const handleProximaPergunta = () => {
    if (perguntaIndex < disciplinaSelecionada.perguntas.length - 1) {
      setPerguntaIndex((prevIndex) => prevIndex + 1);
      setActiveRespostaIndex(null); // Resetar índice ativo
    } else {
      setQuizCompleted(true);
      enviarNota(score);
    }
  };

  const handleRespostaClick = (isCorrect, index) => {
    const newRespostasDadas = [...respostasDadas];
    const previousResposta = newRespostasDadas[perguntaIndex];

    // Atualiza a pontuação ao mudar a resposta
    if (previousResposta !== null) {
      if (previousResposta.isCorrect) {
        setScore((prevScore) => prevScore - 1);
      }
    }
    newRespostasDadas[perguntaIndex] = { isCorrect, index };
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setRespostasDadas(newRespostasDadas);
    setActiveRespostaIndex(index); // Definir índice ativo
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
    setQuizPermitted(true);
    setMotivo('');
    setActiveRespostaIndex(null); // Resetar índice ativo
  };

  return (
    <div className="aluno-jogos-container">
      {!disciplinaSelecionada ? (
        <div className="disciplinas-container">
          {disciplinas
            .filter(disciplina => disciplina.turmaId === turmaId)
            .map((disciplina) => (
              <div key={disciplina.id} className="disciplina-card">
                <h3>{disciplina.nome}</h3>
                <p>Descrição: {disciplina.descricao}</p>
                <button onClick={() => handleDisciplinaClick(disciplina)}>Começar</button>
              </div>
          ))}
        </div>
      ) : (
        <div className="quiz-container">
          {!quizPermitted ? (
            <div className="mensagem-ja-fez">
              <p>{motivo}</p>
              <button onClick={handleVoltarInicio}>Voltar ao Início</button>
            </div>
          ) : (
            quizCompleted ? (
              <div className="resultado-quiz">
                <p>Você completou o quiz, parabéns!</p>
                <p>Pontuação: {score} de {disciplinaSelecionada.perguntas.length}</p>
                <button onClick={handleVoltarInicio}>Voltar ao Início</button>
              </div>
            ) : (
              <div className="pergunta-ativa">
                <p><strong>Pergunta:</strong> {disciplinaSelecionada.perguntas[perguntaIndex].titulo}</p>
                {disciplinaSelecionada.perguntas[perguntaIndex].respostas.map((resposta, index) => (
                  <button
                    key={index}
                    onClick={() => handleRespostaClick(resposta.correta, index)}
                    className={`resposta-btn ${activeRespostaIndex === index ? 'active' : ''}`}
                  >
                    {resposta.alternativa}
                  </button>
                ))}
                <button onClick={handleProximaPergunta} className="proximo-btn">Próxima Pergunta</button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AlunoJogos;
