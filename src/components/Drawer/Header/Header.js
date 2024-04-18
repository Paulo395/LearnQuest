import { fontSize } from "@mui/system";

const Header = ({ title, subtitle }) => {
  return (
    <div style={{
      padding: 20,
      backgroundColor: '#ffffff',
      textAlign: 'left',
      position: 'fixed',
      top: 0,
      left: 240, //Largura a esquerda
      right: 0, // Isso garante que ele ocupe a largura total
      zIndex: 1000 // Garante que o cabeçalho fique sobre outros elementos
    }}>
      <h1 style={{fontSize: 25, margin: 2}}>{title}</h1>
      <h3 style={{fontSize: 10, color: "gray"}}>{subtitle}</h3>
    </div>
  );
};

export default Header;
