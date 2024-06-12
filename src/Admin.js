import React, { useState, useEffect  } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from "./components/Drawer/Sidebar/Sidebar";
import Header from "./components/Drawer/Header/Header";
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminSeminarios from './Pages/Admin/AdminSeminarios';
import AdminPerfil from './Pages/Admin/AdminPerfil';
import AdminConfiguracao from './Pages/Admin/AdminConfiguracao';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import SettingsIcon from '@mui/icons-material/Settings';
import './Aluno.css';
import AdminMensagens from './Pages/Admin/AdminMensagens';

function Admin() {
  const [selectedOption, setSelectedOption] = useState('seminarios');
  const [alunoId, setAlunoId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (id) {
      setAlunoId(id);
    }
  }, [location.search]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const options = [
    { label: 'Turmas', icon: <ClassIcon style={{color: 'white'}} />, value: 'seminarios' },
    { label: 'Usuarios', icon: <SupervisedUserCircleIcon style={{color: 'white'}} />, value: 'mensagens' },
    { label: 'Perfil', icon: <PersonIcon style={{color: 'white'}} />, value: 'perfil' },
    { label: 'Configurações', icon: <SettingsIcon style={{color: 'white'}} />, value: 'configuracoes' }
  ];

  const titles = {
    dashboard: 'Dashboard do Administrador',
    mensagens: 'Gestão do Administrador',
    jogos: 'Adição de Jogos Educativos',
    seminarios: 'Adicionar Turmas',
    perfil: 'Perfil do Administrador',
    configuracoes: 'Configurações'
  }

  const subtitles = {
    dashboard: 'Seja bem-vindo à sua plataforma central',
    mensagens: 'Área dedicada para a gestão de usuarios dentro da plataforma',
    jogos: 'Adicione Jogos Educativos à sua plataforma',
    seminarios: 'Adicione Turmas à sua plataforma',
    perfil: 'Visualize e edite seu perfil de administrador',
    configuracoes: 'Ajuste as configurações da sua plataforma'
  }

  return (
   <div style={{ display: 'flex' }}>
   <Header title={titles[selectedOption]} subtitle={subtitles[selectedOption]}/>
   <Sidebar options={options} selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
   <div className='containerAluno'>
     {selectedOption === 'seminarios' && <AdminSeminarios />}
     {selectedOption === 'mensagens' && <AdminMensagens />}
     {selectedOption === 'perfil' && <AdminPerfil alunoId={alunoId}/>}
     {selectedOption === 'configuracoes' && <AdminConfiguracao alunoId={alunoId}/>}
   </div>
 </div>
  );
}

export default Admin;
