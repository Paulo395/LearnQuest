import React, { useState } from 'react';
import axios from 'axios';

const AlunoConfiguracao = ({ alunoId }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false); // Estado para controlar o envio do formulário
  const [sucesso, setSucesso] = useState(false); // Estado para indicar sucesso no envio

  const atualizarAluno = async (e) => {
    e.preventDefault();

    try {
      setEnviando(true); // Define enviando como true ao iniciar o envio do formulário

      const dadosAtualizados = {
        id: alunoId,
        nome,
        email,
        senha
      };

      const response = await axios.put(`https://localhost:7243/api/Usuario/${alunoId}`, dadosAtualizados);

      console.log('Usuário atualizado:', response.data);
      setSucesso(true); // Define sucesso como true após atualização bem-sucedida
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    } finally {
      setEnviando(false); // Define enviando como false após a conclusão (com sucesso ou erro)
    }
  };

  console.log('ID do Aluno Config:', alunoId); // Exibe o ID do aluno no console

  return (
    <div>
      <h2>Configuração do Aluno</h2>
      {sucesso ? (
        <p>Usuário atualizado com sucesso!</p>
      ) : (
        <form onSubmit={atualizarAluno}>
          <label>
            Nome:
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Senha:
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
          </label>
          <button type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Atualizar'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AlunoConfiguracao;
