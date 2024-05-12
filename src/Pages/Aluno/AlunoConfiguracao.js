import React, { useState } from 'react';
import axios from 'axios';

const AlunoConfiguracao = ({ aluno }) => {
  // Estado local para armazenar os dados do aluno
  const [nome, setNome] = useState(aluno ? aluno.nome : '');
  const [email, setEmail] = useState(aluno ? aluno.email : '');
  const [senha, setSenha] = useState(aluno ? aluno.senha : '');

  // Função para lidar com a atualização do aluno
  const atualizarAluno = async () => {
    try {
      // Montar o objeto de dados para a atualização do aluno, excluindo o campo 'tipo'
      const dadosAtualizados = {
        id: aluno.id,
        nome,
        email,
        senha
      };

      // Enviar uma solicitação PUT para atualizar o usuário
      const response = await axios.put(`https://localhost:7243/api/Usuario/${aluno.id}`, dadosAtualizados);

      // Exibir mensagem de sucesso ou realizar outras ações após a atualização
      console.log('Usuário atualizado:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <div>
      <h2>Configuração do Aluno</h2>
      {/* Formulário para atualização do aluno */}
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
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default AlunoConfiguracao;
