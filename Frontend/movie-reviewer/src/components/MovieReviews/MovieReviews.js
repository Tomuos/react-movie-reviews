import "./MovieReviews.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

function MovieReviews() {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null); // State to hold the movie data

    useEffect(() => {
        const API_Key = process.env.REACT_APP_API_KEY;
        async function fetchMovie() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_Key}&language=en-US`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMovie(data); // Store the movie data in state
            } catch (error) {
                console.error("Could not fetch movie data:", error);
            }
        }

        fetchMovie();
    }, [id]); // Dependency array with the ID to refetch when it changes

    // Render the movie details using the 'movie' state
    return (
        <div className="reviews-page">
            {movie && (
                    <div key={movie.id} className="card-movie">
                        <h1>Movie Information</h1>   
                        <img className="card-poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                        
                        <div className="card-movie-details">
                            <header className="card-title"><span className="card-title-span" >Title: </span>{movie.title}</header>
                            <div id="card-description"><span className="card-overview">Overview: </span>{movie.overview}</div> 
                            <p><span className="card-rating">Rating: </span> {movie.vote_average} / 10</p>
                            <p><span className="card-vote-count">Votes: </span> {movie.vote_count}</p>
                            <p><span className="card-released">Released: </span> {movie.release_date}</p>
                        </div>

                    </div>
            )}

            <div className="card-reviews-area">
                <h1>Reviews</h1>
                <p>Reviews will be displayed here</p>
            </div>
        </div>
    );
}

export default MovieReviews;
