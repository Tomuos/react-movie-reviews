import "./Cards.css";
import "../Card/Card.js";
import Card from "../Card/Card.js";
import { useState, useEffect } from "react";

const API_Key = process.env.REACT_APP_API_KEY;
const APILINK = `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=en-US&page=1`;
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${API_Key}&query=`;


function Cards() {
    const [movies, setMovies] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    async function getMovies(movie_Link) {
        const response = await fetch(movie_Link);
        const data = await response.json();
        setMovies(data.results);      
    }

    useEffect(() => {
        getMovies(APILINK);
    }
    , []);

// console.log(movies);

    async function handleSearchMovies(e) {
        e.preventDefault();
        if (searchTerm) {
            const response = await fetch(SEARCHAPI + searchTerm);
            const data = await response.json();
            setMovies(data.results);
            // console.log(data.results);
            setSearchTerm('');
        }
    }


    getMovies();
    return (
        <div>
            <form onSubmit={handleSearchMovies}>
                <input type="search"
                    onChange = {(e) => setSearchTerm(e.target.value)}
                    >
                    </input>
                </form>
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
                />
            ))}
            </div>
        </div>
    )
}

export default Cards;