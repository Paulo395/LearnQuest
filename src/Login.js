import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo.png';
import arrow from './img/arrow.svg';
import './Login.css';
import './App.css';

function Login() {
  const navigate = useNavigate(); // Utilize useNavigate em vez de useHistory

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Verificar as credenciais
    if (email === 'aa' && password === 'aa') {
      // Redirecionar para a página de aluno
      setLoggedIn(true);
      navigate('/aluno'); // Utilize o navigate para redirecionar
    } else if (email === 'bb' && password === 'bb') {
      // Redirecionar para a página de administrador
      setLoggedIn(true);
      navigate('/admin'); // Utilize o navigate para redirecionar
    } else {
      // Exibir mensagem de erro
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className='container'>
      <header className='header'>
        <img src={logo} alt='workspace' />
        <span>Faça o seu login</span>
      </header>

      <form>
        <div className='inputContainer'>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='exemploemail@gmail.com'
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
  );
}

export default Login;
