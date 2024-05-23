import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlunoSeminarios.css'; // Importar o arquivo CSS para estilização

const AlunoSeminarios = ({ alunoId }) => {
  const [seminarios, setSeminarios] = useState([]);
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
    const fetchSeminarios = async () => {
      try {
        if (turmaId !== null) {
          const response = await axios.get(`https://localhost:7243/api/Seminario?turmaId=${turmaId}`);
          setSeminarios(response.data);
        } else {
          setSeminarios([]);
        }
      } catch (error) {
        console.error('Erro ao buscar seminários:', error);
        setError('Erro ao carregar os seminários.');
      }
    };

    fetchSeminarios();
  }, [turmaId]);

  return (
    <div className="seminarios-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        seminarios.map(seminario => (
          <div className="seminario-card" key={seminario.id}>
            <h3>{seminario.titulo}</h3>
            <p>{seminario.descricao}</p>
            <button onClick={() => window.open(seminario.linkVideo, '_blank')}>VideoAula</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AlunoSeminarios;
