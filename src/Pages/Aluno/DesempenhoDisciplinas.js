import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const DesempenhoDisciplinas = ({ alunoId }) => {
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

      // Generate colors for each discipline
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

  const getDisciplinaName = (disciplinaId) => {
    const disciplina = disciplinas.find(d => d.id === disciplinaId);
    return disciplina ? disciplina.nome : 'Desconhecida';
  };

  const datasets = disciplinas.map((disciplina, index) => {
    const color = colors[disciplina.nome] || generateColor();
    const notasDisciplina = notas.filter(nota => nota.disciplinaId === disciplina.id);
    const notasPontuacoes = notasDisciplina.map(nota => nota.pontuacao);
    return {
      label: disciplina.nome,
      data: notasPontuacoes,
      backgroundColor: color,
    };
  });

  const data = {
    labels: disciplinas.map(disciplina => disciplina.nome),
    datasets: datasets,
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Pontuação',
        },
        min: 0,
        max: 10,
      },
    },
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Gráfico de Notas por Disciplina</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DesempenhoDisciplinas;
