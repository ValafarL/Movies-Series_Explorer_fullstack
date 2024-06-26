import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../css/search.css'
import axios from 'axios'
import Card from './Card';



export default function Search() {
    const { query: initialQuery } = useParams();
    const [currentData, setCurrentData] = useState(undefined);
    useEffect(() => {
        const fetchData = async ()=>{
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
                  params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    query: initialQuery,
                    include_adult: false,
                    media_type: 'movie,TV'
                  },
                });
                setCurrentData(data.results);
              } catch (error) {
              }
        }
        fetchData()
      }, [initialQuery]); 

  return <>
    <div className='container-search-result'>
      {
        currentData ? currentData.map((data, key)=>{
          console.log("DATA", data)
          return <Card data={data} key={key} type={data.media_type}/>
        }):null
      }
    </div>
    <footer>
        This product uses the TMDB API but is not endorsed or certified by TMDB
        <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
          <img className='tmdb-logo' src='/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg' alt="TMDB Logo" />
        </a>      
    </footer>
  </>
}
