import React, { useEffect, useState } from 'react'
import {FaStar} from 'react-icons/fa'
import {BiArrowBack} from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'

const MovieInfo = ({setResults}) => {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const tmdb_api_key = import.meta.env.VITE_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${id}?append_to_respond=videos,credits&api_key=${tmdb_api_key}`;
      const response = await fetch(url);
      const movieData = await response.json();
      console.log(movieData);
      setMovie(movieData);
    };

    fetchMovieDetails();
  },[id]);

  if(!movie) return <div>Loading...</div>
  return (
    <>
    <Link className='link h2 text-dark' to='/'><BiArrowBack /></Link>
      <div className='movie-info  mx-auto'>
        <h2>{movie.original_title} ({movie.release_date})</h2>
        <img className='rounded poster' src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} alt={movie.original_title} />
        <p> <span className='plot lead'>Plot: </span>{movie.overview}</p>
        <p><span className='cast lead'>Cast: </span>{movie.Cast}</p>
        <p><span className='cast lead'>Director: </span>{movie.Director}</p>
        <p> <span className='plot lead'>Genre: </span>{movie.Genre}</p>
        <p><span className='rating lead'>IMDB Rating:</span> {movie.imdbRating} <FaStar  className='mb-1'/> </p>
      </div>
    </>
  )
}

export default MovieInfo
  