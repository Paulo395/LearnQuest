import React, { useState } from 'react';
import Sidebar from "./components/Drawer/Sidebar/Sidebar";
import Header from "./components/Drawer/Header/Header";
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminMensagens from './Pages/Admin/AdminMensagens';
import AdminJogos from './Pages/Admin/AdminJogos';
import './Aluno.css';

function Admin() {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [userType, setUserType] = useState('Admin');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
   <div style={{ display: 'flex' }}>
   <Header/>
   <Sidebar selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
   <div className='containerAluno'>
     {selectedOption === 'dashboard' && <AdminDashboard />}
     {selectedOption === 'mensagens' && <AdminMensagens />}
     {selectedOption === 'jogos' && <AdminJogos />}
   </div>
 </div>
  );
}

export default Admin;
