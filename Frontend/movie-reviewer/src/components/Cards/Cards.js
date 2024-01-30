import "./Cards.css";
import "../Card/Card.js";
import Card from "../Card/Card.js";
import { useState, useEffect } from "react";
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8ecf6fb52cd3882c86f4ea26d10823e2&page=1';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=8ecf6fb52cd3882c86f4ea26d10823e2&query=";


function Cards() {
    const [movies, setMovies] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    async function getMovies() {
        const response = await fetch(APILINK);
        const data = await response.json();
        setMovies(data.results);      
    }

    useEffect(() => {
        getMovies();
    }
    , []);

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


    getMovies();
    return (
        <div>
            <form onSubmit={handleSearchMovies}>
                <input type="search"
                    onChange = {(e) => setSearchTerm(e.target.value)}
                    >
                    </input>
                </form>
            {movies && movies.map((movie) => (
                <Card
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    description={movie.overview}
                    image={movie.poster_path}
                    rating={movie.vote_average}
                    releaseDate={movie.release_date}
                />
            ))}
        </div>
    )
}

export default Cards;