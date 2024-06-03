import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import arrow from './img/arrow.svg';
import './Login.css';
import './App.css';

function Login() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('0');  // Default to 'Aluno'
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
        localStorage.setItem('tipoUsuario', tipoUsuario);
        localStorage.setItem('userId', userId);
        
        const redirectPath = tipoUsuario === 'Admin' ? `/admin?id=${userId}` : tipoUsuario === 'Aluno' ? `/aluno?id=${userId}` : `/professor?id=${userId}`;
        window.location.href = redirectPath;
      }
    } catch (error) {
      setErrorMessage('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('https://localhost:7243/api/Usuario', {
        nome,
        email,
        senha: password,
        tipo: parseInt(userType)
      });
      if (response.status === 200) {
        alert('Cadastro realizado com sucesso!');
        setIsCreatingAccount(false);  // Redirect or close signup form
      }
    } catch (error) {
      setErrorMessage('Cadastro falhou. Tente novamente.');
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
          <span>{isCreatingAccount ? 'Criar Conta' : 'Minha Conta'}</span>
        </header>

        {!isCreatingAccount ? (
          // Login form
          <form>
            <div className='inputContainer'>
              <label htmlFor='email'>E-Mail</label>
              <input type='text' name='email' id='email' placeholder='exemplo@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='inputContainer'>
              <label htmlFor='password'>Senha</label>
              <input type='password' name='password' id='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button className='button' type='button' onClick={handleLogin}>
              Entrar <img src={arrow} alt='' />
            </button>

            <div className='footer'>
              <p>Você não tem uma conta?</p>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsCreatingAccount(true); }}>Crie a sua conta aqui</a>
            </div>
          </form>
        ) : (
          // Signup form
          <form>
            <div className='inputContainer'>
              <label htmlFor='nome'>Nome</label>
              <input type='text' name='nome' id='nome' placeholder='Seu nome completo' value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className='inputContainer'>
              <label htmlFor='email'>E-Mail</label>
              <input type='text' name='email' id='email' placeholder='exemplo@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='inputContainer'>
              <label htmlFor='password'>Senha</label>
              <input type='password' name='password' id='password' placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <FormControl component="fieldset">
              <FormLabel component="legend">Tipo de Usuário</FormLabel>
              <RadioGroup row aria-label="userType" name="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
                <FormControlLabel value="0" control={<Radio />} label="Aluno" />
                <FormControlLabel value="1" control={<Radio />} label="Professor" />
                <FormControlLabel value="2" control={<Radio />} label="Admin" />
              </RadioGroup>
            </FormControl>

            <button className='button' type='button' onClick={handleSignUp}>
              Cadastrar <img src={arrow} alt='' />
            </button>

            <button className='button' type='button' onClick={() => setIsCreatingAccount(false)}>
              Voltar
            </button>
          </form>
        )}

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
