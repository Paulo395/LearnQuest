import React, { useState } from 'react';
import Sidebar from "./components/Drawer/Sidebar/Sidebar";
import Header from "./components/Drawer/Header/Header";
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminMensagens from './Pages/Admin/AdminMensagens';
import AdminJogos from './Pages/Admin/AdminJogos';
import AdminSeminarios from './Pages/Admin/AdminSeminarios';
import AdminPerfil from './Pages/Admin/AdminPerfil';
import AdminConfiguracao from './Pages/Admin/AdminConfiguracao';
import './Aluno.css';

function Admin() {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [userType, setUserType] = useState('Admin');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const titles = {
    dashboard: 'Dashboard do Administrador',
    mensagens: 'Mensagens do Administrador',
    jogos: 'Adição de Jogos Educativos',
    seminarios: 'Adicionar Seminários',
    perfil: 'Perfil do Administrador',
    configuracoes: 'Configurações'
  }

  const subtitles = {
    dashboard: 'Seja bem-vindo à sua plataforma central',
    mensagens: 'Área dedicada para adição de mensagens',
    jogos: 'Adicione Jogos Educativos à sua plataforma',
    seminarios: 'Adicione Seminários à sua plataforma',
    perfil: 'Visualize e edite seu perfil de administrador',
    configuracoes: 'Ajuste as configurações da sua plataforma'
  }

  return (
   <div style={{ display: 'flex' }}>
   <Header title={titles[selectedOption]} subtitle={subtitles[selectedOption]}/>
   <Sidebar selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
   <div className='containerAluno'>
     {selectedOption === 'dashboard' && <AdminDashboard />}
     {selectedOption === 'mensagens' && <AdminMensagens />}
     {selectedOption === 'jogos' && <AdminJogos />}
     {selectedOption === 'seminarios' && <AdminSeminarios />}
     {selectedOption === 'perfil' && <AdminPerfil />}
     {selectedOption === 'configuracoes' && <AdminConfiguracao />}
   </div>
 </div>
  );
}

export default Admin;
