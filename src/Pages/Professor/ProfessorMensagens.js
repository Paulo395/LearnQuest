import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfessorMensagens.css';

const ProfessorMensagens = ({ usuarioId }) => {
  const [mensagem, setMensagem] = useState('');
  const [turmaId, setTurmaId] = useState(null);

  useEffect(() => {
    const fetchTurmaId = async () => {
      try {
        // Faça uma chamada para obter o usuário
        const response = await axios.get(`https://localhost:7243/api/usuario/${usuarioId}`);
        const usuario = response.data;

        // Verifica se o usuário tem turmaId
        if (usuario.turmaId !== null) {
          setTurmaId(usuario.turmaId);
        } else {
          // Se não tiver turmaId, exibe um aviso ou toma outra ação apropriada
          console.log('Usuário não está associado a nenhuma turma');
        }
      } catch (error) {
        console.error('Erro ao obter usuário:', error);
        // Trate o erro de acordo com a sua aplicação
      }
    };

    // Chama a função para buscar o turmaId assim que o componente é montado
    fetchTurmaId();
  }, [usuarioId]);

  const handleInputChange = (event) => {
    setMensagem(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    try {
      // Verifica se o turmaId é válido antes de enviar a mensagem
      if (turmaId !== null) {
        await axios.post('https://localhost:7243/api/Mensagem', { conteudo: mensagem, turmaId });
        alert('Mensagem enviada com sucesso!');
        setMensagem(''); // Limpa o campo após enviar
      } else {
        // Se o turmaId for null, exibe uma mensagem de erro ou toma outra ação apropriada
        alert('Erro: Usuário não está associado a nenhuma turma');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Falha ao enviar mensagem!');
    }
  };

  console.log("Men Id", turmaId)

  return (
    <div className="professor-mensagens-container">
      <h2>Criar Nova Mensagem</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={mensagem}
          onChange={handleInputChange}
          placeholder="Digite sua mensagem aqui..."
          className="mensagem-input"
        ></input>
        <button type="submit" className="enviar-button">Enviar Mensagem</button>
      </form>
    </div>
  );
};

export default ProfessorMensagens;
