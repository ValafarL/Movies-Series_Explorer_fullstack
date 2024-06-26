import { useAppContext } from '../appContext';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { getAllMedia, loadMedia } from './myListFunctions';


export default function MyList() {
    const [myList, setMyList] = useState([])
    const {token} = useAppContext()
    const {userMediaList, setUserMediaList} = useAppContext()
      useEffect(()=>{
        if(token){
          getAllMedia(setUserMediaList, token)
        }
        else{
          setMyList(undefined)
        }
      },[token])

      useEffect(() => {
        if (userMediaList) {
          loadMedia(userMediaList, setMyList);
        }
      }, [userMediaList]);

  return  <div style={{
    marginTop: '100px'
  }} className='container-search-result'>
    {
         myList.length > 0 ? myList.map((data, key)=>{
        return <Card data={data} key={key} />
        }):null
    }
</div>
}
