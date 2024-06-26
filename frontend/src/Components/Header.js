import React, { useState } from 'react';
import '../css/header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../appContext';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const {token, setToken} = useAppContext();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleUserDisconnect = ()=>{
    setToken(undefined)
    window.location.reload()
  }

  return (
    <header>
      {/* Navegação */}
      <div className='container-header-content'>
      <nav>
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/movies'}>Movies</Link></li>
          <li><Link to={'/tv'}>TV Shows</Link></li>
        </ul>
      </nav>

      {/* Barra de Pesquisa */}
        <form className='container-search' onSubmit={handleSearchSubmit}>
          <input
            className='search-bar'
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='header-btns' type="submit">Search</button>
        </form>

      {/* Botão de Login */}
      {
        !token ?
        <Link to={'/login'}
        className='header-btns'>Login</Link>
        :<div className='header-logged-in-container'>
          <nav>
            <ul>
              <li><Link to={'/user/Favorites'} >Favorites</Link></li>
              <li><Link to={'/user/My List'}>My List</Link></li>
            </ul>
          </nav>
          <Link onClick={handleUserDisconnect}
          className='header-btns'>Logout</Link>
        </div>
      }
      </div>
    </header>
  );
}

export default Header;
