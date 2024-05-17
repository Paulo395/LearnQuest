import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlunoMensagens.css'; // Importar o CSS

const AlunoMensagens = () => {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    const carregarMensagens = async () => {
      try {
        const response = await axios.get('https://localhost:7243/api/Mensagem');
        setMensagens(response.data);
      } catch (error) {
        console.error("Erro ao buscar mensagens", error);
      }
    };
    carregarMensagens();
  }, []);

  return (
    <div className="mensagens-container">
      {mensagens.map(mensagem => (
        <div className="mensagem-card" key={mensagem._id}>
          <p>{mensagem.conteudo}</p>
        </div>
      ))}
    </div>
  );
};

export default AlunoMensagens;
