import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessorSeminarios.css';

const AdminSeminarios = ({ usuarioId }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [linkVideo, setLinkVideo] = useState('');
  const [turmaId, setTurmaId] = useState(null);
  const [error, setError] = useState(null);
  const [seminarios, setSeminarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeminarioId, setSelectedSeminarioId] = useState(null);

  useEffect(() => {
    const carregarTurmaId = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/usuario/${usuarioId}`);
        const usuario = response.data;

        if (usuario.turmaId !== null) {
          setTurmaId(usuario.turmaId);
          fetchSeminarios(usuario.turmaId);
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

  const fetchSeminarios = async (turmaId) => {
    try {
      const response = await axios.get(`https://localhost:7243/api/Seminario/listar-todos`);
      setSeminarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar seminários:', error);
    }
  };

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
      fetchSeminarios(turmaId); // Atualizar lista de seminários
    } catch (error) {
      console.error('Erro ao criar seminário:', error);
      alert('Erro ao criar seminário!');
    }
  };

  const handleDeleteSeminario = async (id) => {
    try {
      await axios.delete(`https://localhost:7243/api/Seminario/${id}`);
      alert('Seminário excluído com sucesso!');
      setShowModal(false); // Fechar o modal após a exclusão
      setSelectedSeminarioId(null); // Limpar o seminário selecionado
      fetchSeminarios(turmaId); // Atualizar lista de seminários
    } catch (error) {
      console.error('Erro ao excluir seminário:', error);
      alert('Erro ao excluir seminário.');
    }
  };

  return (
    <div className="professor-seminarios-container">
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
          <div className="button-container">
            <button type="submit">Criar Seminário</button>
            <button style={{backgroundColor: '#dd3b3b'}} type="button" onClick={() => setShowModal(true)}>Excluir Seminários</button>
          </div>
        </form>
      )}

      {showModal && (
        <div className="modal-professor">
          <div className="professor-modal-content">
            <h3>Excluir Seminários</h3>
            <ul>
              {seminarios.map((seminario) => (
                <li key={seminario.id}>
                  {seminario.titulo}
                  <button style={{backgroundColor: '#dd3b3b'}} onClick={() => handleDeleteSeminario(seminario.id)}>Excluir</button>
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSeminarios;
