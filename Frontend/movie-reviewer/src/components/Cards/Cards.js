import "./Cards.css";
import "../Card/Card.js";
import Card from "../Card/Card.js";
import { useState, useEffect } from "react";

import SearchMovie from "../Search/Search.js";

const API_Key = process.env.REACT_APP_API_KEY;


function Cards() {
    const [movies, setMovies] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // State hook must be inside the component
    const totalPages =500;
    
    const APILINK = `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=en-US&page=${currentPage}`;
    const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${API_Key}&query=`;


    async function getMovies(movie_Link) {
        const response = await fetch(movie_Link);
        const data = await response.json();
        setMovies(data.results); 
             
    }

    useEffect(() => {
        getMovies(APILINK);
    }
    , [currentPage, APILINK]);



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


    const goToNextPage = () => setCurrentPage(page => page + 1);
    const goToPreviousPage = () => setCurrentPage(page => page - 1);


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
                    
                />
            ))}
            </div>
            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Cards;