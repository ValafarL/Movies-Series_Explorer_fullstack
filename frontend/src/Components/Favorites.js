import { useAppContext } from '../appContext';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getAllMedia, getFavorites} from './myListFunctions';

export default function Favorites() {
    const [favorites, setFavorites] = useState([])
    const {token} = useAppContext()
    const {userMediaList, setUserMediaList} = useAppContext()
      useEffect(()=>{
        if(token){
          getAllMedia(setUserMediaList, token)
        }
        else{
          setFavorites(undefined)
        }
      },[token])

      useEffect(() => {
        if (userMediaList) {
          getFavorites(userMediaList, setFavorites);
        }
      }, [userMediaList]);

  return  <div style={{
    marginTop: '100px'
  }} className='container-search-result'>
    {
         favorites.length > 0 ? favorites.map((data, key)=>{
          return <Card data={data} key={key} />
        }):null
    }
</div>
}
