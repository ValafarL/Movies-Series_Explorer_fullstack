import React, { useState } from 'react';
import '../css/home.css'; // Arquivo de estilo CSS para o componente Home

function Home() {
    // Estado para controlar o índice do destaque atual
    const [highlightIndex, setHighlightIndex] = useState(0);
  
    // Função para mover o destaque para o próximo item
    const handleNextHighlight = () => {
      setHighlightIndex((highlightIndex + 1) % 5);
    };
  
    // Função para mover o destaque para o item anterior
    const handlePrevHighlight = () => {
      setHighlightIndex((highlightIndex + 4) % 5);
    };
  
    return (
        <>
      <div className="home">
        {/* Carrossel de Destaques */}
        <div className="highlight-carousel">
          <button className="prev-btn" onClick={handlePrevHighlight}>&lt;</button>
          <div className="highlight-items">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className={`highlight-item ${highlightIndex === index ? 'active' : ''}`}
              >
                {/* Espaço para trailers */}
              </div>
            ))}
          </div>
          <button className="next-btn" onClick={handleNextHighlight}>&gt;</button>
        </div>
      </div>
        </>
    );
  }
  
  export default Home;