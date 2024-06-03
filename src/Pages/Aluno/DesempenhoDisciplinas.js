import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const DesempenhoDisciplinas = ({ alunoId }) => {
  const [notas, setNotas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colors, setColors] = useState({});

  const generateColor = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;

  const fetchData = useCallback(async () => {
    if (!alunoId) {
      // Se alunoId não estiver definido, retorne imediatamente sem fazer nada
      return;
    }
    
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

  const calcularProgresso = (notasPontuacoes) => {
    if (notasPontuacoes.length === 0) return 0;
    const total = notasPontuacoes.reduce((acc, nota) => acc + nota, 0);
    const maximoPossivel = notasPontuacoes.length * 10;
    return (total / maximoPossivel) * 100;
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Progresso por Disciplina</h2>
      {disciplinas.slice(0, 2).map(disciplina => { // Limita para as duas primeiras disciplinas
        const notasDisciplina = notas.filter(nota => nota.disciplinaId === disciplina.id);
        const notasPontuacoes = notasDisciplina.map(nota => nota.pontuacao);
        const progresso = calcularProgresso(notasPontuacoes);
        return (
          <div key={disciplina.id} style={{ marginBottom: '20px' }}>
            <p>{disciplina.nome}: {progresso.toFixed(2)}%</p>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
              <div style={{
                width: `${progresso}%`,
                height: '24px',
                backgroundColor: colors[disciplina.nome] || generateColor(),
                borderRadius: '5px'
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DesempenhoDisciplinas;
