// import { useState, useEffect } from 'react';
// const App = () => {
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     // counter=100;  never manually assign variables if there is a setter for that VARIABLE
//     setCounter(0);
//   },[]);
//   return (
//     <div className="App">
//       <button onClick={() => setCounter((prevCount) => prevCount - 1)}>-</button>
//       <h1>{counter}</h1>
//       <button onClick={() => setCounter((prevCount) => prevCount + 1)}>+</button>
//     </div>
//   );
// }

// OMDB API Key :- 47e9b6ad
// OMDB API :- http://www.omdbapi.com/?i=tt3896198&apikey=47e9b6ad

import React from "react";
import { useEffect, useState } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg'
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=47e9b6ad';

const App = () =>{

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('avengers');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
        placeholder="Search for movies" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
        ?
        (
          <div className="container">
            {
              movies.map((movie) => (
                <MovieCard movie={movie} />
              ))
            }
          </div>
        ) : (
          <div>
            <h2>
              No Movies Found
            </h2>
          </div>
        )
      }
    </div>
  );
}
export default App;
