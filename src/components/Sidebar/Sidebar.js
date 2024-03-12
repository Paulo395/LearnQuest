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
import Logo from '/Dev/learn-quest/src/img/logo.png'

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const handleSubMenuToggle = () => {
    setOpenSubMenu(!openSubMenu);
  };

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

        <ListItemButton component={Link} to="/admin">
          <ListItemIcon>
            <DashboardIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Geral" />
        </ListItemButton>

        <ListItemButton onClick={handleSubMenuToggle}>
          <ListItemIcon>
            <MailOutlineIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Mensagens" />
          {openSubMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/receitas/visaoGeral" sx={{ pl: 4 }}>
              <ListItemText primary="Visão Geral" />
            </ListItemButton>

            <ListItemButton component={Link} to="/receitas/mesas" sx={{ pl: 4 }}>
              <ListItemText primary="Plataforma" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton component={Link} to="/configuracao/graficas">
          <ListItemIcon>
            <GamesIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Jogos" />
        </ListItemButton>

        <ListItemButton component={Link} to="/configuracao/graficas">
          <ListItemIcon>
            <ArticleIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Seminários" />
        </ListItemButton>

        <ListItemButton component={Link} to="/configuracao/graficas">
          <ListItemIcon>
            <PersonIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItemButton>
        
        <ListItemButton component={Link} to="/configuracao/graficas">
          <ListItemIcon>
            <SettingsIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Configuração" />
        </ListItemButton>

        <ListItemButton component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
