import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessorMensagens.css';

const ProfessorMensagens = ({ usuarioId }) => {
  const [mensagem, setMensagem] = useState('');
  const [turmaId, setTurmaId] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMessageContent, setEditingMessageContent] = useState('');
  const [error, setError] = useState(null);
  const [numeroMensagens, setNumeroMensagens] = useState(0); // Estado para controlar o número de mensagens
  const limiteMensagens = 3; // Limite máximo de mensagens por turma

  useEffect(() => {
    const fetchTurmaId = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/usuario/${usuarioId}`);
        const usuario = response.data;

        if (usuario.turmaId !== null) {
          setTurmaId(usuario.turmaId);
          fetchMensagens(usuario.turmaId);
        } else {
          setError('Usuário não está associado a nenhuma turma');
        }
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
        setError('Erro ao carregar as informações do usuário.');
      }
    };

    fetchTurmaId();
  }, [usuarioId]);

  useEffect(() => {
    // Atualiza o número de mensagens sempre que o estado de mensagens for alterado
    setNumeroMensagens(mensagens.length);
  }, [mensagens]);

  const fetchMensagens = async (turmaId) => {
    try {
      const response = await axios.get(`https://localhost:7243/api/Mensagem/turma/${turmaId}`);
      setMensagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  const handleInputChange = (event) => {
    setMensagem(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!turmaId) {
      alert('Você não está associado a nenhuma turma.');
      return;
    }

    // Verifica se o número atual de mensagens é menor que o limite máximo
    if (numeroMensagens >= limiteMensagens) {
      alert(`Limite máximo de ${limiteMensagens} mensagens atingido para esta turma.`);
      return;
    }

    if (!mensagem.trim()) {
      alert('Por favor, digite uma mensagem antes de enviar.');
      return;
    }

    try {
      await axios.post('https://localhost:7243/api/Mensagem', { conteudo: mensagem, turmaId });
      alert('Mensagem enviada com sucesso!');
      setMensagem('');
      fetchMensagens(turmaId);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Falha ao enviar mensagem!');
    }
  };

  const handleDeleteMensagem = async (id) => {
    try {
      await axios.delete(`https://localhost:7243/api/Mensagem/${id}`);
      alert('Mensagem deletada com sucesso!');
      setShowModal(false);
      setSelectedMessageId(null);
      fetchMensagens(turmaId);
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      alert('Erro ao deletar mensagem.');
    }
  };

  const handleEditMensagem = (msg) => {
    setSelectedMessageId(msg.id);
    setEditingMessageContent(msg.conteudo);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSaveEditMensagem = async () => {
    try {
      await axios.put(`https://localhost:7243/api/Mensagem/${selectedMessageId}`, {
        conteudo: editingMessageContent,
        turmaId
      });
      alert('Mensagem editada com sucesso!');
      setIsEditing(false);
      setShowModal(false);
      setSelectedMessageId(null);
      fetchMensagens(turmaId);
    } catch (error) {
      console.error('Erro ao editar mensagem:', error);
      alert('Falha ao editar mensagem!');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowModal(false);
    setSelectedMessageId(null);
    setEditingMessageContent('');
  };

  return (
    <div className="professor-mensagens-container">
      <h2>Criar Nova Mensagem</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            value={mensagem}
            onChange={handleInputChange}
            placeholder="Digite sua mensagem aqui..."
            className="mensagem-input"
            required
          ></input>
          <div className="button-container">
            <button type="submit" className="enviar-button">Enviar Mensagem</button>
            <button
              style={{ backgroundColor: '#dd3b3b' }}
              type="button"
              onClick={() => { setIsEditing(false); setShowModal(true); }}
            >
              Editar/Excluir Mensagens
            </button>
          </div>
        </form>
      )}

      {showModal && (
        <div className="modal-professor">
          <div className="professor-modal-content">
            <h3>{isEditing ? 'Editar Mensagem' : 'Excluir Mensagens'}</h3>
            {isEditing ? (
              <div>
                <input
                  style={{ width: '87%' }}
                  value={editingMessageContent}
                  onChange={(e) => setEditingMessageContent(e.target.value)}
                  placeholder="Edite sua mensagem aqui..."
                  className="mensagem-input"
                ></input>
                <div className="button-container">
                  <button onClick={handleSaveEditMensagem}>Salvar</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </div>
              </div>
            ) : (
              <ul>
                {mensagens.map((msg) => (
                  <li key={msg.id}>
                    {msg.dataRegistro}
                    <button style={{ backgroundColor: '#d7e749' }} onClick={() => handleEditMensagem(msg)}>Editar</button>
                    <button style={{ backgroundColor: '#dd3b3b' }} onClick={() => handleDeleteMensagem(msg.id)}>Excluir</button>
                  </li>
                ))}
              </ul>
            )}
            {!isEditing && (
              <button className="close-button" onClick={() => setShowModal(false)}>Fechar</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorMensagens;
