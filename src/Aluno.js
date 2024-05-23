import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "./components/Drawer/Sidebar/Sidebar";
import Header from "./components/Drawer/Header/Header";
import AlunoDashboard from './Pages/Aluno/AlunoDashboard';
import AlunoMensagens from './Pages/Aluno/AlunoMensagens';
import AlunoJogos from './Pages/Aluno/AlunoJogos';
import AlunoSeminarios from './Pages/Aluno/AlunoSeminarios';
import AlunoPerfil from './Pages/Aluno/AlunoPerfil';
import AlunoConfiguracao from './Pages/Aluno/AlunoConfiguracao';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GamesIcon from '@mui/icons-material/Games';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import './Aluno.css';

function Aluno() {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [alunoId, setAlunoId] = useState(null); // Estado para armazenar o ID do aluno
  const location = useLocation(); // Hook do React Router para acessar a localização (URL)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (id) {
      setAlunoId(id);
    }
  }, [location.search]); // Atualiza sempre que a query string da URL muda

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const options = [
    { label: 'Geral', icon: <DashboardIcon style={{color: 'white'}} />, value: 'dashboard' },
    { label: 'Mensagens', icon: <MailOutlineIcon style={{color: 'white'}} />, value: 'mensagens' },
    { label: 'Jogos', icon: <GamesIcon style={{color: 'white'}} />, value: 'jogos' },
    { label: 'Seminários', icon: <ArticleIcon style={{color: 'white'}} />, value: 'seminarios' },
    { label: 'Perfil', icon: <PersonIcon style={{color: 'white'}} />, value: 'perfil' },
    { label: 'Configurações', icon: <SettingsIcon style={{color: 'white'}} />, value: 'configuracoes' }
  ];

  const titles = {
    dashboard: 'Dashboard do Aluno',
    mensagens: 'Mensagens do Aluno',
    jogos: 'Jogos Educativos',
    seminarios: 'Seminários Disponíveis',
    perfil: 'Perfil do Aluno',
    configuracoes: 'Configurações'
  };

  const subtitles = {
    dashboard: 'Seja bem-vindo à sua plataforma central',
    mensagens: 'Receba e envie mensagens importantes',
    jogos: 'Divirta-se e aprenda com nossos jogos educativos',
    seminarios: 'Participe de seminários e workshops exclusivos',
    perfil: 'Gerencie e atualize suas informações pessoais',
    configuracoes: 'Personalize suas preferências e configurações'
  };

  return (
   <div style={{ display: 'flex' }}>
     <Header title={titles[selectedOption]} subtitle={subtitles[selectedOption]} />
     <Sidebar options={options} selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
     <div className='containerAluno'>
       {selectedOption === 'dashboard' && <AlunoDashboard alunoId={alunoId}/>}
       {selectedOption === 'mensagens' && <AlunoMensagens alunoId={alunoId} />}
       {selectedOption === 'jogos' && <AlunoJogos alunoId={alunoId} />}
       {selectedOption === 'seminarios' && <AlunoSeminarios alunoId={alunoId} />}
       {selectedOption === 'perfil' && <AlunoPerfil alunoId={alunoId} />}
       {selectedOption === 'configuracoes' && <AlunoConfiguracao alunoId={alunoId} />}
     </div>
   </div>
  );
}

export default Aluno;
