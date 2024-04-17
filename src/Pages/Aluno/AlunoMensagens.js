import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlunoMensagens = () => {
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
    // Função para carregar as mensagens
    const carregarMensagens = async () => {
      try {
        const response = await axios.get('https://localhost:7243/api/Mensagem'); // Atualize com a URL do seu servidor
        setMensagens(response.data);
      } catch (error) {
        console.error("Erro ao buscar mensagens", error);
      }
    };

    // Chama a função ao carregar o componente
    carregarMensagens();
  }, []); // Array de dependências vazio significa que isso só acontece na montagem do componente

  return (
    <div>
      <h2>Mensagens do Aluno</h2>
      {mensagens.map(mensagem => (
        <div key={mensagem._id}>
          <p>{mensagem.conteudo}</p> {/* Ajuste 'conteudo' conforme a estrutura do seu objeto mensagem */}
        </div>
      ))}
    </div>
  );
};

export default AlunoMensagens;
