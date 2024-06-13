import React, { useState } from 'react';
import axios from 'axios';
import './ProfessorConfiguracao.css'; // Importar o arquivo CSS para estilização

const ProfessorConfiguracao = ({ usuarioId }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(''); // State para mensagens de erro

  const atualizarAluno = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErro(''); // Limpa mensagens de erro anteriores
    try {
      const dadosAtualizados = { id: usuarioId, nome, email, senha };
      await axios.put(`https://localhost:7243/api/Usuario/${usuarioId}`, dadosAtualizados);
      setSucesso(true);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setErro('Erro ao atualizar usuário. Tente novamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="professor-configuracao-container">
      <h2>Atualize seus dados</h2>
      {sucesso ? (
        <p className="sucesso-mensagem">Usuário atualizado com sucesso!</p>
      ) : (
        <form onSubmit={atualizarAluno} className="configuracao-form">
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="exemplo@gmail.com"
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>
          {erro && <p className="erro-mensagem">{erro}</p>}
          <button type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Atualizar'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfessorConfiguracao;
