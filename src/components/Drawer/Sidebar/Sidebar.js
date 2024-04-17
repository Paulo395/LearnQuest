import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GamesIcon from '@mui/icons-material/Games';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './Sidebar.css'

const Sidebar = ({ selectedOption, handleOptionSelect }) => {
  return (
    <Drawer 
      variant="permanent"
      anchor="left"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 230,
          backgroundColor: '#043474', // Cor de fundo
          color: '#fff', // Cor do texto
          padding: '5px',
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      <List>
        <ListItem sx={{ marginBottom: 10, marginTop: 1 }}>
        <ListItemIcon sx={{ justifyContent: 'center'}} >
            <SchoolIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText 
            primary="LearnQuest"
            primaryTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
            
            />
        </ListItem>

        <ListItemButton onClick={() => handleOptionSelect('dashboard')}>
          <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}} >
            <DashboardIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Geral"/>
        </ListItemButton>

        <ListItemButton onClick={() => handleOptionSelect('mensagens')}>
          <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}}>
            <MailOutlineIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Mensagens" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOptionSelect('jogos')}>
          <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}}>
            <GamesIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Jogos" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOptionSelect('seminarios')}>
          <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}}>
            <ArticleIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Seminários" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOptionSelect('perfil')}>
          <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}}>
            <PersonIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItemButton>

        <ListItemButton onClick={() => handleOptionSelect('configuracoes')}>
          <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}}>
            <SettingsIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Configurações" />
        </ListItemButton>

        <ListItemButton 
        onClick={() => handleOptionSelect('sair')}>
          <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}}>
            <ExitToAppIcon style={{ color: 'white' }}  />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItemButton>

      </List>
    </Drawer>
  );
};


export default Sidebar;
