import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessorMensagens.css';

const ProfessorMensagens = ({ usuarioId }) => {
  const [mensagem, setMensagem] = useState('');
  const [turmaId, setTurmaId] = useState(null);
  const [mensagens, setMensagens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    const fetchTurmaId = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/usuario/${usuarioId}`);
        const usuario = response.data;
        if (usuario.turmaId !== null) {
          setTurmaId(usuario.turmaId);
          fetchMensagens(usuario.turmaId); // Buscar mensagens quando o turmaId é definido
        } else {
          console.log('Usuário não está associado a nenhuma turma');
        }
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
      }
    };

    fetchTurmaId();
  }, [usuarioId]);

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
    try {
      if (turmaId !== null) {
        await axios.post('https://localhost:7243/api/Mensagem', { conteudo: mensagem, turmaId });
        alert('Mensagem enviada com sucesso!');
        setMensagem('');
        fetchMensagens(turmaId); // Atualizar lista de mensagens
      } else {
        alert('Erro: Usuário não está associado a nenhuma turma');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Falha ao enviar mensagem!');
    }
  };

  const handleDeleteMensagem = async (id) => {
    try {
      await axios.delete(`https://localhost:7243/api/Mensagem/${id}`);
      alert('Mensagem deletada com sucesso!');
      setShowModal(false); // Fechar o modal após a exclusão
      setSelectedMessageId(null); // Limpar a mensagem selecionada
      fetchMensagens(turmaId); // Atualizar lista de mensagens
    } catch (error) {
      console.error('Erro ao deletar mensagem:', error);
      alert('Erro ao deletar mensagem.');
    }
  };

  return (
    <div className="professor-mensagens-container">
      <h2>Criar Nova Mensagem</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={mensagem}
          onChange={handleInputChange}
          placeholder="Digite sua mensagem aqui..."
          className="mensagem-input"
        ></input>
        <div className="button-container">
          <button type="submit" className="enviar-button">Enviar Mensagem</button>
          <button style={{backgroundColor: '#dd3b3b'}}  type="button" onClick={() => setShowModal(true)}>Excluir Mensagens</button>
        </div>
      </form>

      {showModal && (
        <div className="modal-professor">
          <div className="professor-modal-content">
            <h3>Excluir Mensagens</h3>
            <ul>
              {mensagens.map((msg) => (
                <li key={msg.id}>
                  {msg.conteudo}
                  <button style={{backgroundColor: '#dd3b3b'}}  onClick={() => handleDeleteMensagem(msg.id)}>Excluir</button>
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

export default ProfessorMensagens;
