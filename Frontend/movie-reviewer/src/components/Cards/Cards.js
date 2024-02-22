import "./Cards.css";
import "../Card/Card.js";
import Card from "../Card/Card.js";
import SearchMovie from "../Search/Search.js";
import Pagination from "../Pagination/Pagination.js";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


function Cards() {
    const [movies, setMovies] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // State hook must be inside the component
    const [isSearch, setIsSearch] = useState(false);
    const totalPages =500;

    const location = useLocation();

    const API_Key = process.env.REACT_APP_API_KEY;
    const APILINK = `https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=en-US&page=${currentPage}`;
    const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${API_Key}&query=`;

    // Fetch movies from the API
    async function getMovies(movie_Link) {
        const response = await fetch(movie_Link);
        const data = await response.json();
        setMovies(data.results); 
    }

    // Fetch movies from the API when the page loads, navigate to the current page
    useEffect(() => {
        getMovies(APILINK);
    }
    , [currentPage, APILINK]);


    // Search for movies
    async function handleSearchMovies(e) {
        e.preventDefault();
        if (searchTerm) {
            const response = await fetch(SEARCHAPI + searchTerm);
            const data = await response.json();
            setMovies(data.results);
            console.log(data.results);
            setSearchTerm('');
            setIsSearch(true);
        }
    }

    // Set the current page functions
    const goToNextPage = () => setCurrentPage(page => page + 1);
    const goToPreviousPage = () => setCurrentPage(page => page - 1);

    // useEffect to scroll to top of the page when the page changes
    useEffect(()=> {
        window.scrollTo(0, 0);
    }, [location]);


    return (
        <div>            
           <SearchMovie searchTerm={searchTerm} setSearchTerm={e => setSearchTerm(e.target.value)} handleSearchMovies={handleSearchMovies} />
           
           {!isSearch && <Pagination 
                goToPreviousPage={goToPreviousPage} 
                goToNextPage={goToNextPage} 
                currentPage={currentPage} 
                totalPages={totalPages} />}
            
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

            {!isSearch && <Pagination 
                goToPreviousPage={goToPreviousPage} 
                goToNextPage={goToNextPage} 
                currentPage={currentPage} 
                totalPages={totalPages} />}
        </div>
    )
}

export default Cards;