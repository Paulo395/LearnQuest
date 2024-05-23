import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessorSeminarios.css';

const AdminSeminarios = ({ usuarioId }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [turmaId, setTurmaId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarTurmaId = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/usuario/${usuarioId}`);
        const usuario = response.data;

        if (usuario.turmaId !== null) {
          setTurmaId(usuario.turmaId);
        } else {
          setError('Você não está associado a nenhuma turma.');
        }
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
        setError('Erro ao carregar as informações do usuário.');
      }
    };

    carregarTurmaId();
  }, [usuarioId]);

  console.log("Semi Id", turmaId)

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!turmaId) {
      alert('Você não está associado a nenhuma turma.');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7243/api/Seminario', {
        titulo,
        descricao,
        linkVideo,
        turmaId
      });

      console.log('Seminário criado com sucesso:', response.data);
      alert('Seminário criado com sucesso!');
      setTitulo('');
      setDescricao('');
      setLinkVideo('');
    } catch (error) {
      console.error('Erro ao criar seminário:', error);
      alert('Erro ao criar seminário!');
    }
  };

  return (
    <div className="admin-seminarios-container">
      <h2>Criar Novo Seminário</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Link do Vídeo:</label>
            <input type="text" value={linkVideo} onChange={(e) => setLinkVideo(e.target.value)} required />
          </div>
          <button type="submit">Criar Seminário</button>
        </form>
      )}
    </div>
  );
};

export default AdminSeminarios;
