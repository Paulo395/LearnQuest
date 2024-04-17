import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './img/logo.png';
import arrow from './img/arrow.svg';
import './Login.css';
import './App.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

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
    <div className='testeInicio'>
    <div className='container'>
      <header className='header'>
        <img src={logo} alt='workspace' />
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

        <a href='#'>Esqueceu a sua senha?</a>
        <button className='button' type='button' onClick={handleLogin}>
          Entrar <img src={arrow} alt='' />
        </button>

        <div className='footer'>
          <p>Você não tem uma conta?</p>
          <a href='#'>Crie a sua conta aqui</a>
        </div>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </form>
    </div>
    </div>
  );
}

export default Login;
