import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessorJogos.css'; // Importando o arquivo CSS

const ProfessorJogos = () => {
  const initialDisciplina = {
    nome: '',
    perguntas: Array.from({ length: 3 }, () => ({
      titulo: '',
      respostas: Array.from({ length: 3 }, () => ({
        alternativa: '',
        correta: false
      }))
    }))
  };

  const [turma, setTurma] = useState({
    nome: '',
    disciplinas: [initialDisciplina] // Inicializando com uma disciplina vazia
  });

  const [disciplinasSalvas, setDisciplinasSalvas] = useState([]);
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState(null);

  useEffect(() => {
    // Carregar disciplinas salvas ao montar o componente
    const fetchDisciplinas = async () => {
      try {
        const response = await axios.get('https://localhost:7243/api/Disciplina');
        setDisciplinasSalvas(response.data);
      } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
      }
    };

    fetchDisciplinas();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTurma({
      ...turma,
      [name]: value
    });
  };

  const addDisciplina = () => {
    setTurma({
      ...turma,
      disciplinas: [...turma.disciplinas, initialDisciplina]
    });
  };

  const saveTurma = async () => {
    try {
      const response = await axios.post('https://localhost:7243/api/Turma', turma);
      console.log(response.data);
      alert('Turma salva com sucesso!');
      setDisciplinasSalvas([...disciplinasSalvas, response.data]);
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
      alert('Erro ao salvar turma.');
    }
  };

  const deleteDisciplina = async (id) => {
    try {
      await axios.delete(`https://localhost:7243/api/Disciplina/${id}`);
      console.log('ID da disciplina a ser excluída:', id);
      setDisciplinasSalvas(disciplinasSalvas.filter(disciplina => {
        console.log('ID da disciplina atual:', disciplina.id);
        return disciplina.id !== id;
      }));
      alert('Disciplina excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error);
      alert('Erro ao excluir disciplina.');
    }
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedDisciplinaId(selectedId);
  };

  const handleDeleteButtonClick = () => {
    console.log('ID da disciplina selecionada:', selectedDisciplinaId);
    if (selectedDisciplinaId) {
      deleteDisciplina(selectedDisciplinaId);
      setSelectedDisciplinaId(null);
    } else {
      alert("Por favor, selecione uma disciplina para excluir.");
    }
  };

  return (
    <div className="admin-jogos-container">
      <h2>Administrar Jogos Educacionais</h2>
      {turma.disciplinas.map((disciplina, index) => (
        <div key={index} className="disciplina-container">
          <label>Nome da Disciplina:</label>
          <input 
            type="text"
            name="nome"
            value={disciplina.nome}
            onChange={(e) => {
              const newDisciplinas = [...turma.disciplinas];
              newDisciplinas[index].nome = e.target.value;
              setTurma({
                ...turma,
                disciplinas: newDisciplinas
              });
            }}
          />
          <div className="perguntas-wrapper">
            {disciplina.perguntas.map((pergunta, pIndex) => (
              <div key={pIndex} className="pergunta-container">
                <label>Título da Pergunta:</label>
                <input
                  type="text"
                  name="titulo"
                  value={pergunta.titulo}
                  onChange={(e) => {
                    const newDisciplinas = [...turma.disciplinas];
                    newDisciplinas[index].perguntas[pIndex].titulo = e.target.value;
                    setTurma({
                      ...turma,
                      disciplinas: newDisciplinas
                    });
                  }}
                />
                {pergunta.respostas.map((resposta, rIndex) => (
                  <div key={rIndex} className="resposta-container">
                    <input
                      type="text"
                      value={resposta.alternativa}
                      onChange={(e) => {
                        const newDisciplinas = [...turma.disciplinas];
                        newDisciplinas[index].perguntas[pIndex].respostas[rIndex].alternativa = e.target.value;
                        setTurma({
                          ...turma,
                          disciplinas: newDisciplinas
                        });
                      }}
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={resposta.correta}
                        onChange={(e) => {
                          const newDisciplinas = [...turma.disciplinas];
                          newDisciplinas[index].perguntas[pIndex].respostas[rIndex].correta = e.target.checked;
                          setTurma({
                            ...turma,
                            disciplinas: newDisciplinas
                          });
                        }}
                      />
                      Correta
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={saveTurma}>Salvar Turma</button>
      
      <h3>Disciplinas Salvas</h3>
      <select onChange={handleSelectChange}>
        <option value="">Selecione uma disciplina para excluir</option>
        {disciplinasSalvas.map((disciplina) => (
          <option key={disciplina.id} value={disciplina.id}>
            {disciplina.nome}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteButtonClick}>Excluir Disciplina</button>
    </div>
  );
};

export default ProfessorJogos;
