import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importa a biblioteca Chart.js

const AlunoDesempenho = () => {
  const chartRef = useRef(null); // Referência para o elemento canvas do gráfico
  let chartInstance = useRef(null); // Referência para a instância do gráfico

  useEffect(() => {
    // Função para criar e atualizar o gráfico ao montar o componente
    const createChart = () => {
      const ctx = chartRef.current.getContext('2d'); // Contexto do canvas

      // Dados do gráfico (exemplo: desempenho nas disciplinas)
      const data = {
        labels: ['Português', 'Matemática', 'Ciências'],
        datasets: [
          {
            label: 'Desempenho (%)',
            data: [85, 75, 90], // Pontuação nas disciplinas
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', // Cor para Português
              'rgba(54, 162, 235, 0.5)', // Cor para Matemática
              'rgba(75, 192, 192, 0.5)' // Cor para Ciências
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', // Cor da borda para Português
              'rgba(54, 162, 235, 1)', // Cor da borda para Matemática
              'rgba(75, 192, 192, 1)' // Cor da borda para Ciências
            ],
            borderWidth: 1
          }
        ]
      };

      // Configurações do gráfico
      const options = {
        maintainAspectRatio: false, // Permite ajuste livre do tamanho do gráfico
        responsive: true, // Permite resposta à mudança de tamanho da janela
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100 // Define limites para o eixo Y (de 0 a 100)
          }
        }
      };

      // Criação da instância do gráfico
      chartInstance.current = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico (barra)
        data: data, // Dados do gráfico
        options: options // Configurações do gráfico
      });
    };

    createChart(); // Chama a função para criar o gráfico ao montar o componente

    return () => {
      // Função de limpeza para destruir o gráfico ao desmontar o componente
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destrói a instância do gráfico
      }
    };
  }, []); // Executa apenas uma vez ao montar o componente

  return (
    <div className="chart-container" style={{ maxWidth: '100%', height: '170px'}}>
    <h2>Desempenho nas Disciplinas</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default AlunoDesempenho;
