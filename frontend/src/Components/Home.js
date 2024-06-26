import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../css/home.css';
import '../css/footer.css';
import Rows from './Rows';
import Youtube from "react-youtube";
import { useAppContext } from '../appContext';
import { getAllMedia, loadMedia } from './myListFunctions';


function Home() {
  const [trendingMovie, setTrendingMovie] = useState([])
  const [movieDetails, setMovieDetails] = useState([])
  const [movieTrailer, setMovieTrailer] = useState(undefined)
  const [movieTrailerKey, setMovieTrailerKey] = useState([])
  const {userMediaList, setUserMediaList} = useAppContext()
  const {token} = useAppContext()
  const [myListMovie, setMyListMovie] = useState([])
  const [myListTv, setMyListTv] = useState([])
  const [myList, setMyList] = useState([])
  const BASE_URL = `https://api.themoviedb.org/3`
  const KEY = process.env.REACT_APP_API_KEY
  const movie = {name:'Movies', url:`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${KEY}`, seeMoreLink: '/movies'}
  const tv = {name:'Tv', url:`${BASE_URL}/discover/tv?sort_by=popularity.desc&api_key=${KEY}`, seeMoreLink: '/tv'}

  //details from highlighted movie
  useEffect(()=>{
    const loadData = async () => {
      try {
        const trendingList = await axios.get(`${BASE_URL}/trending/movie/week?sort_by=popularity.desc&api_key=${KEY}`);
        setTrendingMovie(movieDetails);
        const {data:mdData} = await axios.get(`${BASE_URL}/movie/${trendingList.data.results[0].id}?api_key=${KEY}`);
        setMovieDetails(mdData)
        const {data:mtData} = await axios.get(`${BASE_URL}/movie/${trendingList.data.results[0].id}/videos?api_key=${KEY}&language=en-US`);
        setMovieTrailer(mtData)
        
      } catch (error) {
        console.log(error)
      }
    }
    loadData();
  }, []);

  //get trailer
  useEffect(()=>{
    if(movieTrailer){
      try {
        const trailers = movieTrailer.results
        const officialTrailer = [...trailers].reverse().find(trailer => trailer.name.includes("Official Trailer"));
        setMovieTrailerKey(officialTrailer.key)
      } catch (error) { 
        console.log(error)
      }
    }
  }, [movieTrailer]);

  useEffect(()=>{
    if(token){
      getAllMedia(setUserMediaList, token)
    }
    else{
      setUserMediaList(undefined)
    }
  },[token])

  useEffect(() => {
    if (userMediaList) {
      loadMedia(userMediaList, setMyList);
    }
  }, [userMediaList]);

  return <>
  <div className='main-home-container'>
      {
        trendingMovie && movieDetails.vote_average ? 
        <div className="container-highlight">
          <h2>{movieDetails.title}</h2>
          <div className="highlight-poster-trailer">
            <img
              className="trend-img"
              src={`http://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
            />
            {movieTrailerKey?
              <Youtube
              className="youtube"
              videoId={movieTrailerKey}
              origin="https://www.youtube.com/"
              autoplay={false}
            />
              :null
            }
          </div>
          <div className="highlight-details">
            <div className='container-details'>
              <h4>Genres: { movieDetails.genres?.map((genre) => genre.name).join(", ")}</h4>
              <h4>{movieDetails.release_date}</h4>
              <h4>{trendingMovie.runtime}min</h4>
            </div>
              <div className="rating-circle">{movieDetails.vote_average.toFixed(1)}</div>
              <p>{movieDetails.overview}</p>
          </div>
        </div>
          :null
      }
      {
        token && myList.length > 0 ?
        <Rows data={myList} title={'My List'}/>
        :null
      }
      <div className="container-rows">
        <Rows genre={movie} type={'movie'}/>
        <Rows genre={tv} type={'tv'}/>
      </div>   

      <footer>
        This product uses the TMDB API but is not endorsed or certified by TMDB
        <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
          <img className='tmdb-logo-home' src='/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg' alt="TMDB Logo" />
        </a>      
      </footer>
      </div>
    </>
}
  
export default Home;