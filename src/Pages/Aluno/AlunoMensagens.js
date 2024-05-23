import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlunoMensagens.css'; // Importar o CSS

const AlunoMensagens = ({ alunoId }) => {
  const [mensagens, setMensagens] = useState([]);
  const [turmaId, setTurmaId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarTurmaId = async () => {
      try {
        // Faça uma chamada para obter o aluno e seu turmaId
        const response = await axios.get(`https://localhost:7243/api/usuario/${alunoId}`);
        const aluno = response.data;

        // Verifica se o aluno tem turmaId
        if (aluno.turmaId !== null) {
          setTurmaId(aluno.turmaId);
        } else {
          // Se não tiver turmaId, exibe um aviso
          setError('Você não está associado a nenhuma turma.');
        }
      } catch (error) {
        console.error('Erro ao obter aluno:', error);
        setError('Erro ao carregar as informações do aluno.');
      }
    };

    // Chama a função para buscar o turmaId assim que o componente é montado
    carregarTurmaId();
  }, [alunoId]);

  useEffect(() => {
    const carregarMensagens = async () => {
      try {
        if (turmaId !== null) {
          // Faça uma chamada para obter as mensagens da turma correta
          const response = await axios.get(`https://localhost:7243/api/Mensagem/turma/${turmaId}`);
          setMensagens(response.data);
        } else {
          // Se o turmaId for null, não carrega mensagens
          setMensagens([]);
        }
      } catch (error) {
        console.error("Erro ao buscar mensagens", error);
        setError('Erro ao carregar as mensagens.');
      }
    };
    carregarMensagens();
  }, [turmaId]);

  return (
    <div className="mensagens-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        mensagens.map(mensagem => (
          <div className="mensagem-card" key={mensagem.id}>
            <p>{mensagem.conteudo}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AlunoMensagens;
