import React, { useState, useEffect } from 'react';
import './AlunoDashboard.css'; // Importe seu arquivo de estilos CSS
import DesempenhoDisciplinas from './DesempenhoDisciplinas'; // Importe o componente DesempenhoDisciplinas
import axios from 'axios';

const AlunoDashboard = ({ alunoId }) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [seminarios, setSeminarios] = useState([]);
  const [turmaId, setTurmaId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const carregarTurmaId = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/usuario/${alunoId}`);
        const aluno = response.data;

        if (aluno.turmaId !== null && aluno.turmaId !== 0) {
          setTurmaId(aluno.turmaId);
        } else {
          setError('Você não está associado a nenhuma turma válida.');
        }
      } catch (error) {
        console.error('Erro ao obter aluno:', error);
        setError('Erro ao carregar as informações do aluno.');
      }
    };

    carregarTurmaId();
  }, [alunoId]);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/Disciplina?alunoId=${alunoId}`);
        setDisciplinas(response.data);
      } catch (error) {
        console.error('Erro ao carregar disciplinas:', error);
        setError('Erro ao carregar as disciplinas.');
      }
    };

    fetchDisciplinas();
  }, [alunoId]);

  useEffect(() => {
    const fetchSeminarios = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/Seminario/listar-todos`);
        const seminariosTodos = response.data;

        // Filtrar os seminários apenas da turma do aluno
        const seminariosFiltrados = seminariosTodos.filter(seminario => seminario.turmaId === turmaId);

        setSeminarios(seminariosFiltrados);
      } catch (error) {
        console.error('Erro ao buscar seminários:', error);
        setError('Erro ao carregar os seminários.');
      }
    };

    if (turmaId !== null) {
      fetchSeminarios();
    }
  }, [turmaId]);

  const verificarDisciplinasSemNota = async () => {
    try {
      const response = await axios.get(`https://localhost:7243/api/Nota/${alunoId}`);
      const notas = response.data;

      const disciplinasComNota = new Set(notas.map(nota => nota.disciplinaId));
      const disciplinasSemNota = disciplinas.filter(disciplina => !disciplinasComNota.has(disciplina.id));

      return disciplinasSemNota;
    } catch (error) {
      console.error('Erro ao verificar disciplinas sem nota:', error);
      return [];
    }
  };

  const handleAtividadesButtonClick = async () => {
    const disciplinasSemNota = await verificarDisciplinasSemNota();

    if (disciplinasSemNota.length > 0) {
      const disciplinasText = disciplinasSemNota.map(disciplina => disciplina.nome).join(', ');
      alert(`Disciplinas disponíveis para fazer: ${disciplinasText}`);
    } else {
      alert('Você não possui disciplinas disponíveis para fazer no momento.');
    }
  };

  const handleSeminariosButtonClick = () => {
    if (seminarios.length > 0) {
      const seminariosText = seminarios.map(seminario => seminario.titulo).join(', ');
      alert(`Seminários disponíveis para participar: ${seminariosText}`);
    } else {
      alert('Você não possui seminários disponíveis para participar no momento.');
    }
  };

  return (
    <div className="dashboard-container-aluno">
      <div className="dashboard-item-aluno" style={{ backgroundColor: '#ee9f3e', color: 'white' }}>
        <h2>Atividades</h2>
        <p>Acesse a sua última atividade</p>
        <button onClick={handleAtividadesButtonClick}>Última Atividade</button>
      </div>

      <div className="dashboard-item-aluno">
        <h2>Seminários</h2>
        <p>Acesse seu último seminário</p>
        <button onClick={handleSeminariosButtonClick}>Último Seminário</button>
      </div>

      <div className="full-width-div">
        <DesempenhoDisciplinas alunoId={alunoId} />
      </div>
    </div>
  );
};

export default AlunoDashboard;
