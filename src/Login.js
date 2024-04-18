import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import arrow from './img/arrow.svg';
import './Login.css';
import './App.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7243/api/usuario/login', {
        email,
        senha: password
      });
  
      if (response.status === 200) {
        const { tipoUsuario } = response.data;
        if (tipoUsuario === 'Admin') {
          window.location.href = '/admin';
        } else if (tipoUsuario === 'Aluno') {
          window.location.href = '/aluno';
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

        <a href='http://localhost:3000'>Esqueceu a sua senha?</a>
        <button className='button' type='button' onClick={handleLogin}>
          Entrar <img src={arrow} alt='' />
        </button>

        <div className='footer'>
          <p>Você não tem uma conta?</p>
          <a href='http://localhost:3000'>Crie a sua conta aqui</a>
        </div>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </form>
    </div>
    </div>
  );
}

export default Login;
