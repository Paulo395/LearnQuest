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
     <Sidebar selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
     <div className='containerAluno'>
       {selectedOption === 'dashboard' && <AlunoDashboard />}
       {selectedOption === 'mensagens' && <AlunoMensagens />}
       {selectedOption === 'jogos' && <AlunoJogos />}
       {selectedOption === 'seminarios' && <AlunoSeminarios />}
       {selectedOption === 'perfil' && <AlunoPerfil alunoId={alunoId} />}
       {selectedOption === 'configuracoes' && <AlunoConfiguracao alunoId={alunoId} />}
     </div>
   </div>
  );
}

export default Aluno;
