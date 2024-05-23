import React from 'react';
import './AlunoDashboard.css'; // Importe seu arquivo de estilos CSS
import DesempenhoDisciplinas from './DesempenhoDisciplinas'

const Dashboard = ({alunoId}) => {
  // Função para lidar com o clique no botão
  const handleButtonClick = (title) => {
    alert(`Você clicou no botão ${title}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-item">
        <h2>Atividades</h2>
        <button onClick={() => handleButtonClick('Botão 1')}>Botão 1</button>
      </div>

      {/* Div 2 */}
      <div className="dashboard-item">
        <h2>Seminarios</h2>
        <button onClick={() => handleButtonClick('Botão 2')}>Botão 2</button>
      </div>

      {/* Div 3 */}
      <div className="dashboard-item">
        <h2>Não Sei</h2>
        <button onClick={() => handleButtonClick('Botão 3')}>Botão 3</button>
      </div>

      {/* Div que ocupa toda a largura disponível */}
      <div className="full-width-div">
        <DesempenhoDisciplinas alunoId={alunoId} />
      </div>

      <div className="dashboard-item-des">
        <h2>Destaque</h2>
        <button onClick={() => handleButtonClick('Botão 3')}>Botão 3</button>
      </div>

    </div>
  );
};

export default Dashboard;
