import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlunoSeminarios.css'; // Importar o arquivo CSS para estilização

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
    <div className="seminarios-container">
      {seminarios.map(seminario => (
        <div className="seminario-card" key={seminario.id}>
          <h3>{seminario.titulo}</h3>
          <p>{seminario.descricao}</p>
          <button>VideoAula</button>
          <button>Documento</button>
        </div>
      ))}
    </div>
  );
};

export default AlunoSeminarios;
