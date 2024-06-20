import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './AlunoPerfil.css';
import { useLocation } from 'react-router-dom';
import Progresso from './Progresso';

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
            <p> 
            Como aluno do LearnQuest, estou iniciando uma jornada de aprendizado contínuo e crescimento pessoal. Comprometo-me a participar ativamente das disciplinas, dedicando-me para extrair ao máximo o que a plataforma pode me proporcionar.</p>
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