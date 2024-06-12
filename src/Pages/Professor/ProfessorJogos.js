import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessorJogos.css';

const ProfessorJogos = ({ usuarioId }) => {
  const initialDisciplina = {
    nome: '',
    descricao: '',
    perguntas: [
      { titulo: '', respostas: [{ alternativa: '', correta: false }] },
      { titulo: '', respostas: [{ alternativa: '', correta: false }] },
      { titulo: '', respostas: [{ alternativa: '', correta: false }] }
    ]
  };

  const [disciplina, setDisciplina] = useState(initialDisciplina);
  const [disciplinasSalvas, setDisciplinasSalvas] = useState([]);
  const [turmaAtualAluno, setTurmaAtualAluno] = useState(null);
  const [error, setError] = useState('');
  const [turmaId, setTurmaId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDisciplinaId, setSelectedDisciplinaId] = useState(null);

  useEffect(() => {
    const carregarTurmaAtualAluno = async () => {
      try {
        const response = await axios.get(`https://localhost:7243/api/usuario/${usuarioId}`);
        const aluno = response.data;

        if (aluno.turmaId !== null) {
          setTurmaAtualAluno(aluno.turmaId);
          fetchDisciplinas(aluno.turmaId);
        } else {
          setError('Você não está associado a nenhuma turma.');
        }
      } catch (error) {
        console.error('Erro ao obter aluno:', error);
        setError('Erro ao carregar as informações do aluno.');
      }
    };

    carregarTurmaAtualAluno();
  }, [usuarioId]);

  const fetchDisciplinas = async (turmaId) => {
    try {
      const response = await axios.get(`https://localhost:7243/api/Disciplina`);
      setDisciplinasSalvas(response.data);
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error);
    }
  };

  const handleDisciplinaChange = (value, type) => {
    setDisciplina(prevState => ({
      ...prevState,
      [type]: value
    }));
  };

  const handlePerguntaChange = (value, index, type, subIndex) => {
    const newPerguntas = disciplina.perguntas.map((pergunta, i) => {
      if (i === index) {
        if (type === 'alternativa') {
          return {
            ...pergunta,
            respostas: pergunta.respostas.map((resposta, j) => {
              if (j === subIndex) {
                return { ...resposta, alternativa: value };
              }
              return resposta;
            })
          };
        } else if (type === 'correta') {
          return {
            ...pergunta,
            respostas: pergunta.respostas.map((resposta, j) => {
              if (j === subIndex) {
                return { ...resposta, correta: value };
              }
              return { ...resposta, correta: false };
            })
          };
        } else {
          return { ...pergunta, [type]: value };
        }
      }
      return pergunta;
    });
    setDisciplina(prevState => ({
      ...prevState,
      perguntas: newPerguntas
    }));
  };

  const saveDisciplina = async () => {
    if (!turmaAtualAluno) {
      alert('Não foi possível determinar a turma atual do aluno.');
      return;
    }

    if (!disciplina.nome.trim()) {
      alert('Por favor, forneça um nome para a disciplina.');
      return;
    }

    if (disciplina.perguntas.some(pergunta => !pergunta.titulo.trim())) {
      alert('Por favor, preencha todos os títulos de perguntas.');
      return;
    }

    try {
      const newDisciplina = {
        nome: disciplina.nome,
        descricao: disciplina.descricao,
        turmaId: turmaAtualAluno,
        perguntas: disciplina.perguntas,
        notas: []
      };

      const response = await axios.post('https://localhost:7243/api/Disciplina', newDisciplina);
      console.log(response.data);
      alert('Disciplina salva com sucesso!');
      setDisciplinasSalvas([...disciplinasSalvas, response.data]);
    } catch (error) {
      console.error('Erro ao salvar disciplina:', error);
      alert('Erro ao salvar disciplina.');
    }
  };

  const handleDeleteDisciplina = async (id) => {
    try {
      await axios.delete(`https://localhost:7243/api/Disciplina/${id}`);
      alert('Disciplina excluída com sucesso!');
      setShowModal(false);
      fetchDisciplinas(turmaId);
      setSelectedDisciplinaId(null);
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error);
      alert('Erro ao excluir disciplina.');
    }
  };

  return (
    <div className="professor-jogos-container">
      <h2>Administrar Jogos Educacionais</h2>

      <div className="pergunta-container">
        <label>Nome da Disciplina:</label>
        <input 
          type="text"
          value={disciplina.nome}
          onChange={(e) => handleDisciplinaChange(e.target.value, 'nome')}
        />
        <label>Descrição da Disciplina:</label>
        <input
          value={disciplina.descricao}
          onChange={(e) => handleDisciplinaChange(e.target.value, 'descricao')}
        />
        <div>
          {disciplina.perguntas.map((pergunta, index) => (
            <div key={index} className="pergunta-container">
              <label>Pergunta:</label>
              <input
                type="text"
                value={pergunta.titulo}
                onChange={(e) => handlePerguntaChange(e.target.value, index, 'titulo')}
              />
              {pergunta.respostas.map((resposta, subIndex) => (
                <div key={subIndex} className="alternativa-container">
                  <label>Alternativa:</label>
                  <input
                    type="text"
                    value={resposta.alternativa}
                    onChange={(e) => handlePerguntaChange(e.target.value, index, 'alternativa', subIndex)}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={resposta.correta}
                      onChange={(e) => handlePerguntaChange(e.target.checked, index, 'correta', subIndex)}
                    />
                    Correta
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={saveDisciplina}>Salvar Disciplina</button>
          <button style={{backgroundColor: '#dd3b3b'}} onClick={() => { setSelectedDisciplinaId(disciplina.id); setShowModal(true); }}>Excluir Disciplina</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-professor">
        <div className="professor-modal-content">
        <h3>Disciplinas Salvas</h3>
        <ul>
          {disciplinasSalvas.map(disciplina => (
            <li key={disciplina.id}>
              {disciplina.nome}
              <button onClick={() => { handleDeleteDisciplina(disciplina.id); setShowModal(true); }}>Excluir</button>
            </li>
          ))}
        </ul>
          <button className="close-button" onClick={() => setShowModal(false)}>Fechar</button>
        </div>
      </div>
      )}
    </div>
  );
};

export default ProfessorJogos;
