import React, { useState, useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "./components/Drawer/Sidebar/Sidebar";
import Header from "./components/Drawer/Header/Header";
import ProfessorDashboard from './Pages/Professor/ProfessorDashboard';
import ProfessorMensagens from './Pages/Professor/ProfessorMensagens';
import ProfessorJogos from './Pages/Professor/ProfessorJogos';
import ProfessorSeminarios from './Pages/Professor/ProfessorSeminarios';
import ProfessorPerfil from './Pages/Professor/ProfessorPerfil';
import ProfessorConfiguracao from './Pages/Professor/ProfessorConfiguracao';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CasinoIcon from '@mui/icons-material/Casino';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import './Aluno.css';

function Professor() {
  const [selectedOption, setSelectedOption] = useState('mensagens');
  const [userType, setUserType] = useState('Admin');
  const [usuarioId, setUsuarioId] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (id) {
      setUsuarioId(id);
    }
  }, [location.search]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const options = [
    { label: 'Mensagens', icon: <AddCommentIcon style={{color: 'white'}} />, value: 'mensagens' },
    { label: 'Disciplinas', icon: <CasinoIcon style={{color: 'white'}} />, value: 'jogos' },
    { label: 'Seminários', icon: <PostAddIcon style={{color: 'white'}} />, value: 'seminarios' },
    { label: 'Perfil', icon: <PersonIcon style={{color: 'white'}} />, value: 'perfil' },
    { label: 'Configurações', icon: <SettingsIcon style={{color: 'white'}} />, value: 'configuracoes' }
  ];

  const titles = {
    dashboard: 'Dashboard do Professor',
    mensagens: 'Mensagens do Professor',
    jogos: 'Adição de Jogos Educativos',
    seminarios: 'Adicionar Seminários',
    perfil: 'Perfil do Professor',
    configuracoes: 'Configurações'
  }

  const subtitles = {
    dashboard: 'Seja bem-vindo à sua plataforma central',
    mensagens: 'Área dedicada para adição de mensagens',
    jogos: 'Adicione Jogos Educativos à sua plataforma',
    seminarios: 'Adicione Seminários à sua plataforma',
    perfil: 'Visualize e edite seu perfil de Professor',
    configuracoes: 'Ajuste as configurações da sua plataforma'
  }

  return (
   <div style={{ display: 'flex' }}>
   <Header title={titles[selectedOption]} subtitle={subtitles[selectedOption]}/>
   <Sidebar options={options} selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
   <div className='containerAluno'>
     {selectedOption === 'dashboard' && <ProfessorDashboard />}
     {selectedOption === 'mensagens' && <ProfessorMensagens usuarioId={usuarioId}/>}
     {selectedOption === 'jogos' && <ProfessorJogos usuarioId={usuarioId}/>}
     {selectedOption === 'seminarios' && <ProfessorSeminarios usuarioId={usuarioId} />}
     {selectedOption === 'perfil' && <ProfessorPerfil usuarioId={usuarioId}/>}
     {selectedOption === 'configuracoes' && <ProfessorConfiguracao usuarioId={usuarioId}/>}
   </div>
 </div>
  );
}

export default Professor;
