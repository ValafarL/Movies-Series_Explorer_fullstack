import React, {useState,useEffect} from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import '../css/modal.css'
import Youtube from "react-youtube";

const OVERLAY_STYLE ={
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'rgba(0,0,0, .7)',
    zIndex: 999
}
export default function Modal({type,cardID, open, onClose, childdren}) {
    const BASE_URL = `https://api.themoviedb.org/3`
    const KEY = process.env.REACT_APP_API_KEY
    const [details, setDetails] = useState([])
    const [trailer, setTrailer] = useState(undefined)
    const [trailerKey, setTrailerKey] = useState([])
    useEffect(() => {
        if (open) {
            const loadData = async () =>{
                try {
                    const {data:mdData} = await axios.get(`${BASE_URL}/${type}/${cardID.id}?api_key=${KEY}`);
                    setDetails(mdData)
                    const {data:mtData} = await axios.get(`${BASE_URL}/${type}/${cardID.id}/videos?api_key=${KEY}&language=en-US`);
                    setTrailer(mtData)
                } catch (error) {
                    console.log(error)
                }
            }
            loadData()
            document.body.classList.add('modal-open');
        } else {
          document.body.classList.remove('modal-open');
        }
      }, [open]);

      useEffect(()=>{
        if(trailer){
          try {
            const trailers = trailer.results
            const officialTrailer = [...trailers].reverse().find(trailer => trailer.type === "Trailer");
            setTrailerKey(officialTrailer.key)
          } catch (error) { 
            console.log(error)
          }
        }
      }, [trailer]);
      
    if(!open) return null

    return ReactDom.createPortal(<>
     <div style={OVERLAY_STYLE} className='overlay' />
    <div className='modal'>
        <button className='header-btns' onClick={onClose}>
            Close
        </button>
      {
        cardID && details.vote_average ?<div className="container-highlight-modal">
          <h2>{type === 'movie' ? details.title : details.name}</h2>
          <div className="highlight-poster-trailer">
            <img
              className="trend-img"
              src={`http://image.tmdb.org/t/p/w300${details.poster_path}`}
            />
            {trailerKey?
              <Youtube
              className="youtube"
              videoId={trailerKey}
              origin="https://www.youtube.com/"
              autoplay={false}
            />
              :null
        }
          </div>
          <div className="highlight-details">
            <div className='container-details'>
              <h4>Genres: { details.genres?.map((genre) => genre.name).join(', ') }</h4>
              <h4>{type === 'movie' ? details.release_date : details.first_air_date}</h4>
              <h4>{type === 'movie' ? `${details.runtime}min` : 
              `Seasons: ${details.number_of_seasons}
              Episodes: ${details.number_of_episodes}`}</h4>
            </div>
            <div className="rating-circle">{details.vote_average.toFixed(1)}</div>
            <p>{details.overview}</p>
          </div>
        </div>
        :null
        }
        {childdren}
    </div>
    </>
    ,
  document.getElementById('portal')
  )
}
