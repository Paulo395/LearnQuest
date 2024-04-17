import React, { useState } from 'react';
import Sidebar from "./components/Drawer/Sidebar/Sidebar";
import Header from "./components/Drawer/Header/Header";
import AlunoDashboard from './Pages/Aluno/AlunoDashboard';
import AlunoMensagens from './Pages/Aluno/AlunoMensagens';
import AlunoJogos from './Pages/Aluno/AlunoJogos';
import AlunoSeminarios from './Pages/Aluno/AlunoSeminarios';
import AlunoPerfil from './Pages/Aluno/AlunoPerfil';
import AlunoConfiguracao from './Pages/Aluno/AlunoConfiguracao';
import './Aluno.css';

function Aluno() {
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const titles = {
    dashboard: 'Dashboard do Aluno',
    mensagens: 'Mensagens do Aluno',
    jogos: 'Jogos Educativos',
    seminarios: 'Seminários Disponíveis',
    perfil: 'Perfil do Aluno',
    configuracoes: 'Configurações'
  };

  return (
   <div style={{ display: 'flex' }}>
   <Header title={titles[selectedOption]} />
   <Sidebar selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
   <div className='containerAluno'>
     {selectedOption === 'dashboard' && <AlunoDashboard />}
     {selectedOption === 'mensagens' && <AlunoMensagens />}
     {selectedOption === 'jogos' && <AlunoJogos />}
     {selectedOption === 'seminarios' && <AlunoSeminarios />}
     {selectedOption === 'perfil' && <AlunoPerfil />}
     {selectedOption === 'configuracoes' && <AlunoConfiguracao />}
   </div>
 </div>
  );
}

export default Aluno;
