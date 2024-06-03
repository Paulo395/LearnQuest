import React from 'react';
import './ProfessorDashboard.css'; // Importe seu arquivo de estilos CSS

const AdminDashboard = () => {
  const handleButtonClick = (title) => {
    alert(`Você clicou no botão ${title}`);
  };

  return (
    <div className="dashboard-container">
      {/* Bem-vindo */}
      <div className="dashboard-item">
        <h2>Bem-vindo, Professor!</h2>
        <p>Estamos felizes em tê-lo de volta. Aqui está uma visão geral rápida do seu dia.</p>
      </div>

      {/* Aulas de Hoje */}
      <div className="dashboard-item">
        <h2>Aulas de Hoje</h2>
        <ul>
          <li>09:00 - Matemática</li>
          <li>11:00 - Português</li>
          <li>14:00 - Ciências</li>
        </ul>
      </div>

      {/* Notícias Recentes */}
      <div className="dashboard-item">
        <h2>Notícias Recentes</h2>
        <ul>
          <li>Nova política de avaliação implementada.</li>
          <li>Reunião de professores na sexta-feira às 16:00.</li>
          <li>Semana de provas começa na próxima segunda-feira.</li>
        </ul>
      </div>

      {/* Links Úteis */}
      <div className="dashboard-item">
        <h2>Links Úteis</h2>
        <ul>
          <li><a href="#material">Material de Ensino</a></li>
          <li><a href="#ferramentas">Ferramentas</a></li>
          <li><a href="#suporte">Suporte Técnico</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
