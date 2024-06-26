import React, { useState, useEffect } from 'react';
import Card from './Card';
import '../css/displayPosters.css';
import axios from 'axios';

export default function DisplayPosters({type, genre }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesData, setPagesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${genre.url}`);
        setTotalPages(Math.min(data.total_pages, 10)); 
        setPagesData((prevData) => ({ ...prevData, [currentPage]: data.results }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [genre]);

  const fetchPageData = async (page) => {
    if (!pagesData[page]) {
      try {
        const { data } = await axios.get(`${genre.url}&page=${page}`);
        setPagesData((prevData) => ({ ...prevData, [page]: data.results }));
      } catch (error) {
        console.log(error);
        return;
      }
    }
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      fetchPageData(currentPage + 1);
    }
  };
  
  
  return (
    <div className='main-container-posters'>
      <h1>{genre.name}</h1>
      {/* Pages */}
      <div className='pagination'>
        <button className='display-btns' onClick={goToPrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span className='pages'>
          {currentPage} / {totalPages}
        </span>
        <button className='display-btns' onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Container posters */}
      <div className='posters-container'>
        {pagesData[currentPage] &&
          pagesData[currentPage].map((poster, key) => {
            return <Card type={type} key={key} data={poster} />
          })}
      </div>
    </div>
  );
}
