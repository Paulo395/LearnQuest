import React, { useState } from 'react';
import axios from 'axios';
import './AdminSeminarios.css'; // Importando o arquivo CSS

const AdminSeminarios = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [linkVideo, setLinkVideo] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7243/api/Seminario', {
        titulo: titulo,
        descricao: descricao,
        linkVideo: linkVideo
      });

      console.log('Seminário criado com sucesso:', response.data);
      alert('Seminário criado com sucesso!');
      // Limpar os campos após o envio bem-sucedido
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
    </div>
  );
};

export default AdminSeminarios;
