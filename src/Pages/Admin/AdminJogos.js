import React, { useState } from 'react';
import axios from 'axios';

const AdminJogos = () => {
    const [turma, setTurma] = useState({
        nome: '',
        disciplinas: []
    });

    const handleInputChange = (e) => {
        setTurma({
            ...turma,
            [e.target.name]: e.target.value
        });
    };

    const handleDisciplinaChange = (index, event) => {
        const newDisciplinas = [...turma.disciplinas];
        newDisciplinas[index][event.target.name] = event.target.value;
        setTurma({
            ...turma,
            disciplinas: newDisciplinas
        });
    };

    const handlePerguntaChange = (disciplinaIndex, perguntaIndex, event) => {
        const updatedTurma = { ...turma };
        updatedTurma.disciplinas[disciplinaIndex].perguntas[perguntaIndex][event.target.name] = event.target.value;
        setTurma(updatedTurma);
    };

    const handleRespostaChange = (disciplinaIndex, perguntaIndex, respostaIndex, event) => {
        const updatedTurma = { ...turma };
        if (event.target.name === 'correta') {
            // Garantir que apenas uma resposta seja marcada como correta
            updatedTurma.disciplinas[disciplinaIndex].perguntas[perguntaIndex].respostas.forEach((resp, idx) => {
                resp.correta = idx === respostaIndex ? event.target.checked : false;
            });
        } else {
            updatedTurma.disciplinas[disciplinaIndex].perguntas[perguntaIndex].respostas[respostaIndex].alternativa = event.target.value;
        }
        setTurma(updatedTurma);
    };

    const addPergunta = (disciplinaIndex) => {
        const newDisciplinas = [...turma.disciplinas];
        newDisciplinas[disciplinaIndex].perguntas.push({
            titulo: '',
            respostas: [
                { alternativa: '', correta: false },
                { alternativa: '', correta: false },
                { alternativa: '', correta: false }
            ]
        });
        setTurma({
            ...turma,
            disciplinas: newDisciplinas
        });
    };

    const addDisciplina = () => {
        const newDisciplinas = [...turma.disciplinas, {
            nome: '',
            perguntas: []
        }];
        setTurma({
            ...turma,
            disciplinas: newDisciplinas
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
        <div>
            <h2>Administrar Jogos Educacionais</h2>
            <div>
                <label>Nome da Turma:</label>
                <input type="text" name="nome" value={turma.nome} onChange={handleInputChange} />
                <button onClick={addDisciplina}>Adicionar Disciplina</button>
                {turma.disciplinas.map((disciplina, index) => (
                    <div key={index}>
                        <label>Nome da Disciplina:</label>
                        <input type="text" name="nome" value={disciplina.nome} onChange={(e) => handleDisciplinaChange(index, e)} />
                        <button onClick={() => addPergunta(index)}>Adicionar Pergunta</button>
                        {disciplina.perguntas.map((pergunta, pIndex) => (
                            <div key={pIndex}>
                                <label>Título da Pergunta:</label>
                                <input type="text" name="titulo" value={pergunta.titulo} onChange={(e) => handlePerguntaChange(index, pIndex, e)} />
                                {pergunta.respostas.map((resposta, rIndex) => (
                                    <div key={rIndex}>
                                        <input
                                            type="text"
                                            value={resposta.alternativa}
                                            onChange={(e) => handleRespostaChange(index, pIndex, rIndex, e)}
                                        />
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="correta"
                                                checked={resposta.correta}
                                                onChange={(e) => handleRespostaChange(index, pIndex, rIndex, e)}
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
        </div>
    );
};

export default AdminJogos;
