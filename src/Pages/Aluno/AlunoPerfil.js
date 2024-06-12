import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './AlunoPerfil.css';
import { useLocation } from 'react-router-dom';

// Função calcularProgresso
const calcularProgresso = (notasPontuacoes) => {
  if (notasPontuacoes.length === 0) return 0;
  const total = notasPontuacoes.reduce((acc, nota) => acc + nota, 0);
  const maximoPossivel = notasPontuacoes.length * 3;
  return (total / maximoPossivel) * 100;
};

// Componente Progresso
const Progresso = ({ alunoId }) => {
  const [notas, setNotas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colors, setColors] = useState({});

  const generateColor = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;

  const fetchData = useCallback(async () => {
    try {
      const notasResponse = await axios.get(`https://localhost:7243/api/Nota/${alunoId}`);
      const disciplinasResponse = await axios.get('https://localhost:7243/api/Disciplina');
      setNotas(notasResponse.data);
      setDisciplinas(disciplinasResponse.data);

      const disciplineColors = {};
      disciplinasResponse.data.forEach((disciplina) => {
        disciplineColors[disciplina.nome] = generateColor();
      });
      setColors(disciplineColors);

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError('Erro ao buscar dados. Por favor, tente novamente mais tarde.');
      setLoading(false);
    }
  }, [alunoId]);

  useEffect(() => {
    if (alunoId) {
      fetchData();
    }
  }, [alunoId, fetchData]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const calcularProgressoGeral = () => {
    const progressoGeral = calcularProgresso(notas.map(nota => nota.pontuacao));
    return progressoGeral;
  };

  const progressoGeral = calcularProgressoGeral();

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Progresso Geral do Aluno</h2>
      <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
        <div style={{
          width: `${progressoGeral}%`,
          height: '24px',
          backgroundColor: '#76c7c0',
        }} />
      </div>
      <p>{progressoGeral.toFixed(2)}%</p>
    </div>
  );
};

// Componente AlunoPerfil
const AlunoPerfil = () => {
  const [aluno, setAluno] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const alunoId = searchParams.get('id');

  useEffect(() => {
    const fetchAlunoById = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/Usuario/${alunoId}`);
        if (response.status === 200) {
          setAluno(response.data);
        } else {
          console.error('Erro ao buscar aluno por ID');
        }
      } catch (error) {
        console.error('Erro ao buscar aluno por ID:', error);
      }
    };

    if (alunoId) {
      fetchAlunoById();
    }
  }, [alunoId]);

  return (
    <div className='aluno-perfil-container' >
      {aluno ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ marginRight: '50px' }}>
            <img
              src="https://via.placeholder.com/150"
              alt="Foto do Aluno"
              style={{ width: '170px', height: '170px', borderRadius: '50%', border: '2px solid #eaeaea' }}
            />
          </div>
          <div>
            <p><strong>Nome:</strong> {aluno.nome}</p>
            <p><strong>Email:</strong> {aluno.email}</p>
            <p><strong>Turma:</strong> {aluno.turmaId}</p>
            <p><strong>Biografia: </strong>  
            Sou um estudante dedicado, apaixonado por aprender e explorar novos conhecimentos.
            Busco constantemente desafios que me permitam crescer e desenvolver minhas habilidades. 
            Estou sempre em busca de novas oportunidades para expandir meus horizontes e contribuir de forma positiva para o mundo ao meu redor.{aluno.email}</p>
          </div>
        </div>
      ) : (
        <p>Carregando perfil do aluno...</p>
      )}
      {aluno && <Progresso alunoId={alunoId} />}
    </div>
  );
};

export default AlunoPerfil;