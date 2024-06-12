import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSeminarios.css'; // Importando o arquivo CSS

const AdminSeminarios = () => {
  const [turma, setTurma] = useState({ nome: '' });
  const [turmas, setTurmas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTurmaId, setSelectedTurmaId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTurmaNome, setEditingTurmaNome] = useState('');

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = async () => {
    try {
      const response = await axios.get('https://localhost:7243/api/Turma');
      setTurmas(response.data);
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTurma({ ...turma, [name]: value });
  };

  const handleTurmaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7243/api/Turma', turma);
      console.log(response.data);
      alert('Turma criada com sucesso!');
      setTurma({ nome: '' });
      fetchTurmas(); // Atualiza a lista de turmas
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      alert('Erro ao criar turma.');
    }
  };

  const handleDeleteTurma = async (id) => {
    try {
      await axios.delete(`https://localhost:7243/api/Turma/${id}`);
      alert('Turma deletada com sucesso!');
      fetchTurmas(); // Atualiza a lista de turmas
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao deletar turma:', error);
      alert('Erro ao deletar turma.');
    }
  };

  const handleEditTurma = (turma) => {
    setSelectedTurmaId(turma.id);
    setEditingTurmaNome(turma.nome);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSaveEditTurma = async () => {
    try {
      await axios.put(`https://localhost:7243/api/Turma/${selectedTurmaId}`, {
        nome: editingTurmaNome
      });
      alert('Turma editada com sucesso!');
      setIsEditing(false);
      setShowModal(false);
      setSelectedTurmaId(null);
      fetchTurmas(); // Atualiza a lista de turmas
    } catch (error) {
      console.error('Erro ao editar turma:', error);
      alert('Falha ao editar turma!');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowModal(false);
    setSelectedTurmaId(null);
    setEditingTurmaNome('');
  };

  return (
    <div className="admin-turmas-container">
      <h2>Criar Nova Turma</h2>
      <form onSubmit={handleTurmaSubmit}>
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
        <div className="button-container">
          <button type="submit">Criar Turma</button>
          <button style={{backgroundColor: '#dd3b3b'}} type="button" onClick={() => setShowModal(true)}>Editar/Excluir Turmas</button>
        </div>
      </form>

      {showModal && (
        <div className="modal-adm">
          <div className="adm-modal-content">
            <h3>{isEditing ? 'Editar Turma' : 'Excluir Turmas'}</h3>
            {isEditing ? (
              <div>
                <div>
                  <label>Nome da Turma:</label>
                  <input
                    type="text"
                    value={editingTurmaNome}
                    onChange={(e) => setEditingTurmaNome(e.target.value)}
                    required
                  />
                </div>
                <div className="button-container">
                <button onClick={handleSaveEditTurma}>Salvar</button>
                <button onClick={handleCancelEdit}>Cancelar</button>
                </div>
              </div>
            ) : (
              <ul>
                {turmas.map((turma) => (
                  <li key={turma.id}>
                    {turma.nome}
                    <button style={{ backgroundColor: '#d7e749' }} onClick={() => handleEditTurma(turma)}>Editar</button>
                    <button style={{backgroundColor: '#dd3b3b'}} onClick={() => handleDeleteTurma(turma.id)}>Excluir</button>
                  </li>
                ))}
              </ul>
            )}
            {!isEditing && (
              <button onClick={() => setShowModal(false)}>Fechar</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSeminarios;
