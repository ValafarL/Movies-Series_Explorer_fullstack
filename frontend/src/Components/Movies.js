import React from 'react';
import { useParams } from 'react-router-dom';
import DisplayPosters from './DisplayPosters';
import Rows from './Rows';
import '../css/footer.css'

export default function Movies() {
  const KEY = `api_key=${process.env.REACT_APP_API_KEY}`
  const BASE_URL = `https://api.themoviedb.org/3`
  const G_DEFAULT_URL = `${BASE_URL}/discover/movie?${KEY}`
  const TYPE = `movies`
  const GENRES = [
    {name: "Trending", url: `${BASE_URL}/trending/movie/week?${KEY}`, seeMoreLink:`/${TYPE}/Trending`}, 
    {name: "Now Playing", url: `${BASE_URL}/movie/now_playing?${KEY}`, seeMoreLink:`/${TYPE}/Now playing`}, 
    {name: "Top Rated", url: `${BASE_URL}/movie/top_rated?${KEY}`, seeMoreLink:`/${TYPE}/Top Rated`}, 
    {name: "Action", url: `${G_DEFAULT_URL}&with_genres=${28}`, seeMoreLink:`/${TYPE}/Action`}, 
    {name: "Adventure", url: `${G_DEFAULT_URL}&with_genres=${12}`, seeMoreLink:`/${TYPE}/Adventure`},
    {name: "Animation", url: `${G_DEFAULT_URL}&with_genres=${16}`, seeMoreLink:`/${TYPE}/Animation`}, 
    {name: "Comedy", url: `${G_DEFAULT_URL}&with_genres=${35}`, seeMoreLink:`/${TYPE}/Comedy`},
    {name: "Crime", url: `${G_DEFAULT_URL}&with_genres=${80}`, seeMoreLink:`/${TYPE}/Crime`},
    {name: "Drama", url: `${G_DEFAULT_URL}&with_genres=${18}`, seeMoreLink:`/${TYPE}/Drama`}, 
    {name: "Fantasy", url: `${G_DEFAULT_URL}&with_genres=${14}`, seeMoreLink:`/${TYPE}/Fantasy`}, 
    {name: "Horror", url: `${G_DEFAULT_URL}&with_genres=${27}`, seeMoreLink:`/${TYPE}/Horror`},
    {name: "Mystery", url: `${G_DEFAULT_URL}&with_genres=${9648}`, seeMoreLink:`/${TYPE}/Mystery`}, 
    {name: "Romance", url: `${G_DEFAULT_URL}&with_genres=${10749}`, seeMoreLink:`/${TYPE}/Romance`}, 
    {name: "Science Fiction", url: `${G_DEFAULT_URL}&with_genres=${878}`, seeMoreLink:`/${TYPE}/Science Fiction`},
    {name: "Thriller", url: `${G_DEFAULT_URL}&with_genres=${53}`, seeMoreLink:`/${TYPE}/Thriller`}, 
    {name: "War", url: `${G_DEFAULT_URL}&with_genres=${10752}`, seeMoreLink:`/${TYPE}/War`}, 
    {name: "Western", url: `${G_DEFAULT_URL}&with_genres=${37}`, seeMoreLink:`/${TYPE}/Western`}
  ]
  const { query: genreQuery } = useParams();

  return <>
  {
      !genreQuery ? <div className='container-display-genres'>
        {
          GENRES.map((genre, key)=>{
            console.log("query", genreQuery)
              return <>
                <Rows type={'movie'} genre={genre}/>
              </>
          })
        }
      </div>:(
        GENRES.map((genre, key) => {
        if (genre.name === genreQuery)
        {
          return <DisplayPosters type={'movie'} key={key} genre={genre}/>
        }
        return null
      }))
    }
      <footer className='.footer'>
        This product uses the TMDB API but is not endorsed or certified by TMDB
        <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
          <img className='tmdb-logo' src='/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg' alt="TMDB Logo" />
        </a>      
      </footer>
  </>
}
