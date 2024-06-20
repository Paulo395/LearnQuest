import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Progresso.css'; // Importe seu arquivo de estilos CSS

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

  const calcularProgresso = (notasPontuacoes) => {
    if (notasPontuacoes.length === 0) return 0;
    const total = notasPontuacoes.reduce((acc, nota) => acc + nota, 0);
    const maximoPossivel = notasPontuacoes.length * 3;
    return (total / maximoPossivel) * 100;
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const calcularProgressoGeral = () => {
    const progressoGeral = calcularProgresso(notas.map(nota => nota.pontuacao));
    return progressoGeral;
  };

  const progressoGeral = calcularProgressoGeral();

  return (
    <div className="progresso-container">
      <h2>Progresso Geral do Aluno</h2>
      <div className="progress-bar-background">
        <div className="progress-bar" style={{ width: `${progressoGeral}%` }} />
      </div>
      <p>{progressoGeral.toFixed(2)}%</p>
    </div>
  );
};

export default Progresso;
