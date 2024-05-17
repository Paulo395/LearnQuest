import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AlunoPerfil() {
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
    <div>
      {aluno ? (
        <div>
          <p><strong>Nome:</strong> {aluno.nome}</p>
          <p><strong>Email:</strong> {aluno.email}</p>
          {/* Adicione outros campos conforme necessário */}
        </div>
      ) : (
        <p>Carregando perfil do aluno...</p>
      )}
    </div>
  );
}

export default AlunoPerfil;
