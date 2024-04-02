import React, { useState } from 'react';
import Sidebar from "./components/Drawer/Sidebar/Sidebar";
import Header from "./components/Drawer/Header/Header";
import AlunoDashboard from './Pages/Aluno/AlunoDashboard';
import AlunoMensagens from './Pages/Aluno/AlunoMensagens';
import AlunoJogos from './Pages/Aluno/AlunoJogos';
import './Aluno.css';

function Aluno() {
  const [selectedOption, setSelectedOption] = useState('dashboard');
  const [userType, setUserType] = useState('Aluno');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
   <div style={{ display: 'flex' }}>
   <Header/>
   <Sidebar selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
   <div className='containerAluno'>
     {selectedOption === 'dashboard' && <AlunoDashboard />}
     {selectedOption === 'mensagens' && <AlunoMensagens />}
     {selectedOption === 'jogos' && <AlunoJogos />}
   </div>
 </div>
  );
}

export default Aluno;
