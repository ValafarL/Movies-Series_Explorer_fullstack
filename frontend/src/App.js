import Header from './Components/Header';
import Home from './Components/Home';
import { Route, Routes } from "react-router-dom";
import Movies from './Components/Movies';
import Tvshows from './Components/Tvshows';
import Search from './Components/Search';
import Login from './Components/Login';
import { AppProvider } from './appContext'; 
import Register from './Components/Register';
import MyList from './Components/MyList';
import Favorites from './Components/Favorites';

function App() {
  return (
    <AppProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/movies' element={<Movies />} />
        <Route path="/movies/:query" element={<Movies />} />
        <Route path='/tv' element={<Tvshows />} />
        <Route path="/tv/:query" element={<Tvshows />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/user/Favorites" element={<Favorites />} />
        <Route path="/user/MY List" element={<MyList />} />
      </Routes>   
    </AppProvider>
  );
}

export default App;
