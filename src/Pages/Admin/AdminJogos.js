import React, { useState } from 'react';
import axios from 'axios';
import './AdminJogos.css'; // Importando o arquivo CSS

const AdminJogos = () => {
  const [turma, setTurma] = useState({
    nome: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTurma({ ...turma, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7243/api/Turma', turma);
      console.log(response.data);
      alert('Turma criada com sucesso!');
      setTurma({ nome: '' });
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      alert('Erro ao criar turma.');
    }
  };

  return (
    <div className="admin-turmas-container">
      <h2>Criar Nova Turma</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Turma:</label>
          <input
            type="text"
            name="nome"
            value={turma.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Criar Turma</button>
      </form>
    </div>
  );
};

export default AdminJogos;
