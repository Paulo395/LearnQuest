import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSeminarios.css'; // Importando o arquivo CSS

const AdminSeminarios = () => {
  const [turmas, setTurmas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState('');

  useEffect(() => {
    fetchTurmas();
    fetchUsuarios();
  }, []);

  const fetchTurmas = async () => {
    try {
      const response = await axios.get('https://localhost:7243/api/Turma');
      setTurmas(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('https://localhost:7243/api/Usuario');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleUsuarioChange = (e) => {
    const userId = e.target.value;
    const user = usuarios.find(u => u.id === parseInt(userId));
    setSelectedUsuario(user || '');
  };

  const handleTurmaChange = (e) => {
    setSelectedTurma(e.target.value);
  };

  const handleAssociate = async () => {
    if (selectedUsuario && selectedTurma) {
      const updatedUser = { ...selectedUsuario, TurmaId: selectedTurma };
      try {
        await axios.put(`https://localhost:7243/api/Usuario/${selectedUsuario.id}`, updatedUser);
        alert('Usuário associado à turma com sucesso!');
        setSelectedUsuario('');
        setSelectedTurma('');
      } catch (error) {
        console.error('Erro ao associar usuário à turma:', error);
        alert('Erro ao associar usuário à turma.');
      }
    } else {
      alert('Por favor, selecione um usuário e uma turma.');
    }
  };

  return (
    <div className="admin-turmas-container">
      <h2>Associar Usuários a Turmas</h2>
      <div>
        <label>Usuário:</label>
        <select value={selectedUsuario.id || ''} onChange={handleUsuarioChange} required>
          <option value="">Selecione um usuário</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Turma:</label>
        <select value={selectedTurma} onChange={handleTurmaChange} required>
          <option value="">Selecione uma turma</option>
          {turmas.map(turma => (
            <option key={turma.id} value={turma.id}>{turma.nome}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAssociate}>Associar Usuário à Turma</button>
    </div>
  );
};

export default AdminSeminarios;
