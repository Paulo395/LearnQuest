import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AdminPerfil() {
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

  console.log('ID do Aluno Perfil:', alunoId); // Exibe o ID do aluno no console

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
            Como administrador da plataforma LearnQuest, estou empenhado(a) em fornecer uma plataforma de aprendizado robusta e fácil de usar para alunos e professores. Sendo ela projetada para facilitar o acesso a recursos educacionais, promover a colaboração e rastrear o progresso do aluno. 
            </p>
          </div>
        </div>
      ) : (
        <p>Carregando perfil do aluno...</p>
      )}
    </div>
  );
}

export default AdminPerfil;
