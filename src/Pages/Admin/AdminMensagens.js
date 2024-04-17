import React, { useState } from 'react';
import axios from 'axios';

const AdminMensagens = () => {
  const [mensagem, setMensagem] = useState('');

  const handleInputChange = (event) => {
    setMensagem(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    try {
      await axios.post('https://localhost:7243/api/Mensagem', { conteudo: mensagem });
      alert('Mensagem enviada com sucesso!');
      setMensagem(''); // Limpa o campo após enviar
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Falha ao enviar mensagem!');
    }
  };

  return (
    <div>
      <h2>Mensagens do Admin</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={mensagem}
          onChange={handleInputChange}
          placeholder="Digite sua mensagem aqui..."
          rows="4"
          cols="50"
        ></textarea>
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  );
};

export default AdminMensagens;
