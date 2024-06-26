import React, {useState, useEffect} from 'react'
import '../css/card.css'
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlusCircle, faHeart, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useAppContext } from '../appContext';
import { useNavigate } from 'react-router-dom';

export default function Card({data, type}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentDataFromUser, setCurrentDataFromUser] = useState(undefined)
  const P_BASE_URL = "https://image.tmdb.org/t/p/"
  const P_SIZE = "original"
  const {userMediaList, setUserMediaList} = useAppContext()
  const {token} = useAppContext()
  const navigate = useNavigate();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'


  async function deleteMedia(mediaID){
      try {
        await axios.delete(`${BACKEND_URL}/api/media/${mediaID}`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setCurrentDataFromUser(undefined)
        setUserMediaList((prev)=>prev.filter((media)=>media.media_TMDB_ID !== mediaID))
      } catch (error) {
        console.log(error)
      }
  }
  

  async function addMedia(upMyList, upFavorite,){
      const {id} = data
      try {
        const {data} = await axios.post(`${BACKEND_URL}/api/media`, 
        {
          media_TMDB_ID: id,
          typeMovieOrTv: type,
          isAddToFavorites: upFavorite,
          isAddToMyList: upMyList,
        }, 
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        setCurrentDataFromUser(data)
        setUserMediaList((prev)=>[...prev, data])
      } catch (error) {
        console.log(error)
      }
  }

  async function updateMedia(upMyList, upFavorite){
    const {id} = data
      try {
        const {data} = await axios.patch(`${BACKEND_URL}/api/media/${id}`,
        {
          media_TMDB_ID: id,
          updates:{
            isAddToFavorites: upFavorite,
            isAddToMyList: upMyList,
          },
        }, 
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }) 
        setCurrentDataFromUser(data)
        setUserMediaList((prev)=>[...prev, data])
      } catch (error) {
        console.log(error)
      }
  }

    useEffect(()=>{
      if(data){
      setCurrentDataFromUser(undefined)
      if(token && userMediaList){
        const media = userMediaList.find(media => media.media_TMDB_ID === data.id);
        if(media){
          setCurrentDataFromUser(media)
        }
      }
    }
    },[token, data])
  return <>
  { data?<>
   <div className="card">
      <img className="card-image" src={`${P_BASE_URL}${P_SIZE}${data.poster_path}`} alt={"poster"} />
      <div className='card-hover-details'>
        <h6 className='card-title'>{type === 'movie' ? data.title: data.name}</h6>
        <div className='container-card-hover-details-buttons'>
          <button className='button-icons' aria-label="play" onClick={()=>setIsModalOpen(true)}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
            <button onClick={()=>{
              if(token){
                if(!currentDataFromUser){
                  addMedia(true, false)
                }
                else if(currentDataFromUser.isAddToFavorites == false &&
                currentDataFromUser.isAddToMyList == true){
                  deleteMedia(currentDataFromUser.media_TMDB_ID)
                }
                else{
                  updateMedia(!currentDataFromUser.isAddToMyList,
                    currentDataFromUser.isAddToFavorites)
                }
              }
              else{
                navigate('/login')
              }
            }}
            className='button-icons' 
            aria-label="add"
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}>
            {
              currentDataFromUser && currentDataFromUser.isAddToMyList ? 
                (isHovered ? <FontAwesomeIcon icon={faTimesCircle} /> : <FontAwesomeIcon icon={faCheckCircle} />)
                : <FontAwesomeIcon icon={faPlusCircle} />
            }
            </button>
            <button onClick={()=>{
              if(token){
                if(!currentDataFromUser){
                  addMedia(false, true)
                }
                else if(currentDataFromUser.isAddToFavorites == true &&
                currentDataFromUser.isAddToMyList == false){
                  deleteMedia(currentDataFromUser.media_TMDB_ID)
                }
                else{
                  updateMedia(currentDataFromUser.isAddToMyList, 
                    !currentDataFromUser.isAddToFavorites)
                }
              }
              else{
                navigate('/login')
              }
            }}
            className={`button-icons ${
              currentDataFromUser && currentDataFromUser.isAddToFavorites ?
              'toggle-heart-redToBLue'
              : 'toggle-heart-blueToRed'
            }`}
            aria-label="favorite">
              <FontAwesomeIcon icon={faHeart} />
            </button>
        </div>
      </div>
    </div>
    <Modal type={type} cardID={data} open={isModalOpen} onClose={()=> setIsModalOpen(false)}/>
  </>:null}</>
}
