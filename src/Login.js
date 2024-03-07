import React, {useState} from 'react';
import logo from './img/logo.svg';
import arrow from './img/arrow.svg'
import './Login.css'
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Verificar as credenciais
    if (email === 'aa' && password === 'aa') {
      // Redirecionar para a página de usuário
      setLoggedIn(true);
      // Aqui você pode fazer o redirecionamento para a página de usuário
    } else if (email === 'bb' && password === 'bb') {
      // Redirecionar para a página de administrador
      setLoggedIn(true);
      // Aqui você pode fazer o redirecionamento para a página de administrador
    } else {
      // Exibir mensagem de erro
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    }
  }; 

  return (
    <div className='container'>
      <header className='header'>
        <img src={logo} alt='workspace'/>
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
          />
        </div>

        <div className='inputContainer'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='********'
          />
        </div>

        <a href=''>Esqueceu a sua senha?</a>
        <button className='button'>
          Entrar <img src={arrow} alt=''/>
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
