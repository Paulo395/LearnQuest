import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlunoMensagens.css'; // Importar o CSS
import { fontWeight } from '@mui/system';

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
        setError('Não a mensagens nessa turma!');
      }
    };
    carregarMensagens();
  }, [turmaId]);

  return (
    <div className="aluno-mensagens-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        mensagens.map(mensagem => (
          <div className="mensagem-card" key={mensagem.id}>
            <p style={{fontWeight: 'bold', marginBottom: '15px'}}>Nova Mensagem</p>
            <p>{mensagem.conteudo}</p>
            <p style={{ marginTop: '15px', color: '#043474' }}>
            {(() => {
            const data = new Date(mensagem.dataRegistro);
            const dia = data.toLocaleString('pt-BR', { day: '2-digit' });
            const mes = data.toLocaleString('pt-BR', { month: '2-digit' });
            const ano = data.toLocaleString('pt-BR', { year: 'numeric' });
            const hora = data.toLocaleString('pt-BR', { hour: '2-digit' });
            const minuto = data.getMinutes().toString().padStart(2, '0');

            return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
            })()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AlunoMensagens;
