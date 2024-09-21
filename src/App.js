import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const[movies, setMovies] = useState([]);
  const[isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = () => {
    setIsLoading(true);
    fetch("https://swapi.dev/api/films/").then(response => {return response.json()}).then(data => {
      const updatedMovies = data.results.map((entry) => {
        return {
          id:entry.episode_id,
          title:entry.title,
          openingText:entry.opening_crawl,
          releaseDate:entry.release_date
        }
      })

      setMovies(updatedMovies);
      setIsLoading(false);
    })
  }

  let content = <p>No Movies Found.</p>
  if(movies.length > 0) content= <MoviesList movies={movies} />
  if(isLoading) content=<p>Loading...</p>

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
