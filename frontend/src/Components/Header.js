import React from 'react';
import '../css/header.css'

function Header() {
  return (
    <header>
      {/* Navegação */}
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Documentaries</a></li>
          <li><a href="#">Animes</a></li>
          <li><a href="#">Games</a></li>
        </ul>
      </nav>

      {/* Barra de Pesquisa */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Botão de Login */}
      <button className="login-btn">Login</button>
    </header>
  );
}

export default Header;
