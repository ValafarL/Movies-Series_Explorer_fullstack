import React, { useState } from 'react';
import '../css/filter.css';


export default function Filter({ genres, handleSearch, setSelectedGenres}) {

  const handleGenreChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, value]);
    } else {
      setSelectedGenres((prevSelectedGenres) =>
        prevSelectedGenres.filter((genre) => genre !== value)
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(event.target.elements.order.value,
      event.target.elements.sortBy.value);
  };

  return (
    <form onSubmit={handleSubmit} className="filter-container">
      {/* Genre Filter */}
      <div className="filter-section-genres">
        <h3>Genres</h3>
        {genres.map((genre) => (
          <label key={genre.id}>
            <input
              type="checkbox"
              name={genre.name}
              value={genre.id}
              onChange={handleGenreChange}
            />{' '}
            {genre.name}
          </label>
        ))}
      </div>

      {/* Order Filter */}
      <div className="filter-section">
        <h3>Order</h3>
        <label>
          <input checked={true} type="radio" name="order" value="desc" /> Descending
        </label>
        <label>
          <input type="radio" name="order" value="asc" /> Ascending
        </label>
      </div>

      {/* Sort By Dropdown */}
      <div className="filter-section">
        <h3>Sort By</h3>
        <select name="sortBy">
          <option value="select">Select</option>
          <option value="vote_average">Rating</option>
          <option value="popularity">Popupality</option>
          <option value="primary_release_date">Realease Date</option>
        </select>
      </div>

      <button type="submit" className="filter-button">
        Search
      </button>
    </form>
  );
}
