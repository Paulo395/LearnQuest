import React from 'react';
import './AlunoDashboard.css'; // Importe seu arquivo de estilos CSS
import DesempenhoDisciplinas from './DesempenhoDisciplinas';

const AunoDashboard = ({ alunoId }) => {
  // Função para lidar com o clique no botão
  const handleButtonClick = (title) => {
    alert(`Você clicou no botão ${title}`);
  };

  return (
    <div className="dashboard-container-aluno">
      <div className="dashboard-item-aluno" style={{backgroundColor: '#ee9f3e', color: 'white'}}>
        <h2>Atividades</h2>
        <p>Acesse a sua ultima atividade</p>
        <button onClick={() => handleButtonClick('Botão 1')}>Ultima Atividade</button>
      </div>

      <div className="dashboard-item-aluno">
        <h2>Seminarios</h2>
        <p>Acesse seu ultimo seminario</p>
        <button onClick={() => handleButtonClick('Botão 2')}>Ultimo Seminario</button>
      </div>

      <div className="full-width-div">
        <DesempenhoDisciplinas alunoId={alunoId} />
      </div>
    </div>
  );
};

export default AunoDashboard;
