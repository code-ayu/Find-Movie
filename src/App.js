import logo from './logo.svg';
import {useState , useEffect} from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

import './App.css';

const API_URL = "https://www.omdbapi.com/?apikey=c17e88b3"

//http://www.omdbapi.com/?i=tt3896198&apikey=c17e88b3
function App() {
  const [movies , setMovies ] = useState([]);
  const [searchTerm , setSearchTerm] = useState('') 

  const searchMovie = async(title) =>{
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  
  useEffect(() =>{
    searchMovie("{movies}")

  }, [])

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input placeholder='Search for movie' value = {searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}></input>
          <img src = {SearchIcon} onClick={() => searchMovie(searchTerm)}></img>
      </div>

      {
        movies?.length>0 ? 
        (
           <div className='container'>
          {movies.map((movie)=> (
              <MovieCard movie={movie}/>
          ))}
        
      </div>) :
      (
        <div className='empty'>
          <h2>No Movie Found </h2>
        </div>
      )
      }

      
    </div>
  );
}

export default App;
