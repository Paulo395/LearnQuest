import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = ({ options, selectedOption, handleOptionSelect }) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate(-1);
  };

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
            <SchoolIcon style={{ color: 'white' }} /> {/* Ícone que será exibido à esquerda */}
          </ListItemIcon>
          <ListItemText 
            primary="LearnQuest"
            primaryTypographyProps={{ variant: 'h6', fontWeight: 'bold', color: 'white' }} // Defina a cor do texto como branco
          />
        </ListItem>

        {options.map((option, index) => (
          <ListItemButton key={index} onClick={() => handleOptionSelect(option.value)}>
            <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}}>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.label} />
          </ListItemButton>
        ))}
      </List>

      <ListItemButton onClick={handleGoBack} sx={{ position: 'absolute', bottom: 0, width: '100%', padding: 5 }}>
        <ListItemIcon sx={{ justifyContent: 'center', marginRight: 2}}>
          <ExitToAppIcon style={{ color: 'grey' }}  />
        </ListItemIcon>
        <ListItemText primary="Sair" primaryTypographyProps={{ color: 'grey' }} />
      </ListItemButton>
    </Drawer>
  );
};

export default Sidebar;
