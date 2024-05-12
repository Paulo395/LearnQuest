import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import arrow from './img/arrow.svg';
import './Login.css';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7243/api/usuario/login', {
        email,
        senha: password,
        nome
      });

      if (response.status === 200) {
        const { tipoUsuario, userId } = response.data;

        // Armazena os dados do usuário no localStorage
        localStorage.setItem('tipoUsuario', tipoUsuario);
        localStorage.setItem('userId', userId);

        if (tipoUsuario === 'Admin') {
          window.location.href = '/admin';
        } else if (tipoUsuario === 'Aluno') {
          // Redireciona para a página do aluno com o userId como parâmetro na URL
          window.location.href = `/aluno?id=${userId}`;
        } else {
          setErrorMessage('Tipo de usuário desconhecido.');
        }
      }
    } catch (error) {
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className='container'>
      <div className='central-div'>
        <header className='header'>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'black' }}>
            <SchoolIcon sx={{ fontSize: '50px' }} />
            <Typography variant="h4" sx={{ marginLeft: 1, fontWeight: 'bold', margin: 3 }}>LearnQuest</Typography>
          </Box>
          <span>Minha Conta</span>
        </header>

        <form>
          <div className='inputContainer'>
            <label htmlFor='email'>E-Mail</label>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='exemplo@gmail.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='inputContainer'>
            <label htmlFor='password'>Senha</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className='button' type='button' onClick={handleLogin}>
            Entrar <img src={arrow} alt='' />
          </button>

          {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
