import "./Cards.css";
import "../Card/Card.js";
import Card from "../Card/Card.js";
import MovieReviews from "../MovieReviews/MovieReviews.js";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import SearchMovie from "../Search/Search.js";

const API_Key = process.env.REACT_APP_API_KEY;
const APILINK = `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=en-US&page=1`;
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${API_Key}&query=`;


function Cards() {
    const [movies, setMovies] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [movie, setMovie] = useState(null);
    const { id } = useParams();

    console.log(movie)

    async function getMovies(movie_Link) {
        const response = await fetch(movie_Link);
        const data = await response.json();
        console.log(data)
        setMovies(data.results);      
    }

    useEffect(() => {
        getMovies(APILINK);
    }
    , []);

// console.log(movies);

    async function getMovie(id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_Key}&language=en-US`);
        const data = await response.json();
        console.log(data, "movie data")
        console.log(data.title, "movie title")
        setMovie(data);
}

    async function handleSearchMovies(e) {
        e.preventDefault();
        if (searchTerm) {
            const response = await fetch(SEARCHAPI + searchTerm);
            const data = await response.json();
            setMovies(data.results);
            console.log(data.results);
            setSearchTerm('');
        }
    }

    useEffect(() => {
        if (id) {
            getMovie(id);
        }
    }, [id]);


    getMovies();
    return (
        <div>            
        <SearchMovie searchTerm={searchTerm} setSearchTerm={e => setSearchTerm(e.target.value)} handleSearchMovies={handleSearchMovies} />
                <div className="row">
            {movies && movies.map((movie) => (
                <Card
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    description={movie.overview}
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    rating={movie.vote_average}
                    releaseDate={movie.release_date}
                    handleSeeReviews={() => getMovie(movie.id)}
                />
            ))}
            </div>
            {movie && <MovieReviews movie={movie} />}
        </div>
    )
}

export default Cards;