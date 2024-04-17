import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlunoSeminarios = () => {
  const [seminarios, setSeminarios] = useState([]);

  useEffect(() => {
    const fetchSeminarios = async () => {
      try {
        const response = await axios.get('https://localhost:7243/api/Seminario');
        setSeminarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar seminários:', error);
      }
    };

    fetchSeminarios();
  }, []);

  return (
    <div>
      <h2>Seminários do Aluno</h2>
      {seminarios.map(seminario => (
        <div key={seminario.id}>
          <h3>{seminario.titulo}</h3>
          <iframe width="560" 
          height="315" 
          src="https://www.youtube.com/embed/FTQbiNvZqaY?si=w3nIFP5DMRQc58Lm" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen></iframe>
          <p>{seminario.descricao}</p>
        </div>
      ))}
    </div>
  );
};

export default AlunoSeminarios;
