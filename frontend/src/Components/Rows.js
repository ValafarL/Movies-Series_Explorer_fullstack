import React, { useState, useEffect } from "react";
import "../css/rows.css";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function Rows({genre, type, title, data}) {
  const [firstPoster, setFirstPoster] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData([])
    if(!data){
      const fetchData = async ()=>{
        try {
          const {data} = await axios.get(`${genre.url}`);
          setCurrentData(data.results)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    }
    else{
      setCurrentData(data)
    }
  }, [genre, data]); 

  function updateRow(buttonSide) {
    if (buttonSide === "left") {
      setFirstPoster(() => {
        if(firstPoster - 5 < 0){
          return(currentData.length - 5);
        }
        else{
          return(firstPoster - 5);
        }
      });
    } else if (buttonSide === "right") {
      setFirstPoster(() => {
        if(firstPoster + 5 >= currentData.length){
          return 0;
        }
        else{
          return(firstPoster + 5);
        }
      });
    }
  }

  return currentData ?
    <div className="container-row">
      <div className='container-row-info'>
            <h2 className='genre-title'>{!data ? genre.name : `${title}`} -</h2>
            <Link className='see-more-link' to={!data ? genre.seeMoreLink:title}>See more</Link>
      </div>
      <div className="container-two">
        <button onClick={() => updateRow("left")} className="button-icon">
          <FontAwesomeIcon className="icon" icon={faChevronLeft} />
        </button>
          <div className="div-posters">
          {currentData.length > 0 &&
          currentData.slice(firstPoster, firstPoster + 5).map( (item, key) => 
                {
                  if(data && item != undefined){
                    return <Card type={item.type} data={item} key={key}/>
                  }
                  else if (!data){
                    return <Card type={type} data={item} key={key}/>
                  }
              }
              )
          }
          </div>
          <button onClick={() => updateRow("right")} className="button-icon">
          <FontAwesomeIcon className="icon" icon={faChevronRight} />
          </button>
      </div>
    </div>
  :null
}
