import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GamesIcon from '@mui/icons-material/Games';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Logo from '../../../img/logo.png';
import AlunoDashboard from '../../../Pages/Aluno/AlunoDashboard'; // Importe os componentes correspondentes às opções da sidebar
import AlunoMensagens from '../../../Pages/Aluno/AlunoMensagens';
import AlunoJogos from '../../../Pages/Aluno/AlunoJogos';
import AlunoPerfil from '../../../Pages/Aluno/AlunoPerfil';
import AlunoSeminarios from '../../../Pages/Aluno/AlunoSeminarios';
import AlunoConfiguracao from '../../../Pages/Aluno/AlunoConfiguracao';
import AlunoSair from '../../../Pages/Aluno/AlunoSair';
import './Sidebar.css'

const Sidebar = ({ selectedOption, handleOptionSelect }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: '#043474', // Cor de fundo
          color: '#fff', // Cor do texto
        },
      }}
    >
      <List>
        <ListItem>
          <img src={Logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
        </ListItem>

        <ListItemButton onClick={() => handleOptionSelect('dashboard')}>
          <ListItemIcon>
            <DashboardIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Geral" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOptionSelect('mensagens')}>
          <ListItemIcon>
            <MailOutlineIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Mensagens" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOptionSelect('jogos')}>
          <ListItemIcon>
            <GamesIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Jogos" />
        </ListItemButton>

      </List>
    </Drawer>
  );
};

const Aluno = () => {
  const [selectedOption, setSelectedOption] = useState('dashboard');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
      <div className='container'>
        <h1>Aluno</h1>
        {/* Renderizar o conteúdo correspondente com base na opção selecionada */}
        {selectedOption === 'dashboard' && <AlunoDashboard />}
        {selectedOption === 'mensagens' && <AlunoMensagens />}
        {selectedOption === 'jogos' && <AlunoJogos />}
        {/* Adicione outras opções da sidebar conforme necessário */}
      </div>
    </div>
  );
};

export default Aluno;
