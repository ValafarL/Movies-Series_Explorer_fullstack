import React from 'react';
import { useParams } from 'react-router-dom';
import DisplayPosters from './DisplayPosters';
import Rows from './Rows';


export default function Tvshows() {
  const KEY = `api_key=${process.env.REACT_APP_API_KEY}`
  const BASE_URL = `https://api.themoviedb.org/3`
  const G_DEFAULT_URL = `${BASE_URL}/discover/tv?${KEY}`
  const TYPE = 'tv'
  const GENRES = [
    {id: 10759, name: "Trending", url: `${BASE_URL}/trending/tv/week?${KEY}`, seeMoreLink:`/${TYPE}/Trending`}, 
    {id: 10759, name: "On the air", url: `${BASE_URL}/tv/on_the_air?${KEY}`, seeMoreLink:`/${TYPE}/On the air`}, 
    {id: 10759, name: "Top rated", url: `${BASE_URL}/tv/top_rated?${KEY}`, seeMoreLink:`/${TYPE}/Top rated`}, 
    {id: 10759, name: "Action & Adventure", url: `${G_DEFAULT_URL}&with_genres=${10759}`, seeMoreLink:`/${TYPE}/Action & Adventure`}, 
    {id: 16, name: "Animation", url: `${G_DEFAULT_URL}&with_genres=${16}`, seeMoreLink:`/${TYPE}/Animation`},
    {id: 35, name: "Comedy", url: `${G_DEFAULT_URL}&with_genres=${35}`, seeMoreLink:`/${TYPE}/Comedy`}, 
    {id: 80, name: "Crime", url: `${G_DEFAULT_URL}&with_genres=${80}`, seeMoreLink:`/${TYPE}/Crime`}, 
    {id: 18, name: "Drama", url: `${G_DEFAULT_URL}&with_genres=${18}`, seeMoreLink:`/${TYPE}/Drama`}, 
    {id: 9648, name: "Mystery", url: `${G_DEFAULT_URL}&with_genres=${9648}`, seeMoreLink:`/${TYPE}/Mystery`}, 
    {id: 10765, name: "Sci-Fi & Fantasy", url: `${G_DEFAULT_URL}&with_genres=${10765}`, seeMoreLink:`/${TYPE}/Sci-Fi & Fantasy`}, 
    {id: 10768, name: "War", url: `${G_DEFAULT_URL}&with_genres=${10768}`, seeMoreLink:`/${TYPE}/War`},
    {id: 37, name: "Western", url: `${G_DEFAULT_URL}&with_genres=${37}`, seeMoreLink:`/${TYPE}/Western`}
  ]
  const { query: genreQuery } = useParams();

  return<>
    {
      !genreQuery ? <div className='container-display-genres'>
        {
          GENRES.map((genre, key)=>{
            console.log("query", genreQuery)
              return <Rows type={TYPE} genre={genre} key={key}/>
          })
        }
      </div>:(
        GENRES.map((genre, key) => {
        if (genre.name === genreQuery)
        {
          return <DisplayPosters type={TYPE} key={key} genre={genre}/>
        }
        return null
      }))
    }
    <footer>
        This product uses the TMDB API but is not endorsed or certified by TMDB
        <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
          <img className='tmdb-logo' src='/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg' alt="TMDB Logo" />
        </a>      
    </footer>
    </>
}
