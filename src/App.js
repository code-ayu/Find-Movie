import logo from './logo.svg';
import {useState , useEffect} from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

import './App.css';

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=c17e88b3"
const movie1 = {
  "Title": "Iron Man 2",
  "Year": "2010",
  "imdbID": "tt1228705",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg"
}


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
