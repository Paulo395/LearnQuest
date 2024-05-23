import React from 'react';
import DesempenhoDisciplinas from '../Aluno/DesempenhoDisciplinas'

const AdminDashboard = () => {
  const handleButtonClick = (title) => {
    alert(`Você clicou no botão ${title}`);
  };

  const desempenho = {
    portugues: 80,
    matematica: 75,
    ciencias: 90
  };

  return (
    <div className="dashboard-container">
      {/* Div 1 */}
      <div className="dashboard-item">
        <h2>Professor</h2>
        <button onClick={() => handleButtonClick('Botão 1')}>Botão 1</button>
      </div>

      {/* Div 2 */}
      <div className="dashboard-item">
        <h2>Título 2</h2>
        <button onClick={() => handleButtonClick('Botão 2')}>Botão 2</button>
      </div>

      {/* Div 3 */}
      <div className="dashboard-item">
        <h2>Título 3</h2>
        <button onClick={() => handleButtonClick('Botão 3')}>Botão 3</button>
      </div>

      {/* Div que ocupa toda a largura disponível */}
      <div className="full-width-div">
        <DesempenhoDisciplinas desempenho={desempenho} />
      </div>

      <div className="dashboard-item">
        <h2>Título 4</h2>
        <button onClick={() => handleButtonClick('Botão 3')}>Botão 3</button>
      </div>

    </div>
  );
};

export default AdminDashboard;
