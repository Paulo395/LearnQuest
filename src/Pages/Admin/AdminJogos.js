import React, { useState } from 'react';
import axios from 'axios';
import './AdminJogos.css'; // Importando o arquivo CSS

const AdminJogos = () => {
  const [turma, setTurma] = useState({
    nome: '',
    disciplinas: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTurma({
      ...turma,
      [name]: value
    });
  };

  const addDisciplina = () => {
    const newDisciplina = {
      nome: '',
      perguntas: Array.from({ length: 3 }, () => ({
        titulo: '',
        respostas: Array.from({ length: 3 }, () => ({
          alternativa: '',
          correta: false
        }))
      }))
    };

    setTurma({
      ...turma,
      disciplinas: [...turma.disciplinas, newDisciplina]
    });
  };

  const saveTurma = async () => {
    try {
      const response = await axios.post('https://localhost:7243/api/Turma', turma);
      console.log(response.data);
      alert('Turma salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
      alert('Erro ao salvar turma.');
    }
  };

  return (
    <div className="admin-jogos-container">
      <h2>Administrar Jogos Educacionais</h2>
      <button onClick={addDisciplina}>Adicionar Disciplina</button>
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
      ))}
      <button onClick={saveTurma}>Salvar Turma</button>
    </div>
  );
};

export default AdminJogos;
