import "./MovieReviews.css";
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from "react";

function MovieReviews({movie}) {
//     const { id } = useParams();
//     const [movie, setMovie] = useState(null);
    
//     useEffect(() => {
//     async function getMovie() {
//         const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
//         const data = await response.json();
//         setMovie(data);
    

//     }
//     getMovie();
//     }
//     , [id]);
//     console.log(movie);
    
        return (
        <div>
        <div className="movie-information">
            <div key={movie.id} className="card">
                <header className="title">{movie.title}</header>
                <img className="poster" src={movie.image} alt={movie.title} />
                <div id="description">
                    <span>Overview: </span>
                    {movie.description}
                </div>
                <p><span className="rating" >Rating:</span> {parseInt(movie.rating)} / 10</p>
                <p><span className="vote-count" >Votes:</span>{movie.vote_count}</p>
                <p><span className="released">Released:</span> {movie.releaseDate}</p>
            </div>
        </div>

        <div className="reviews-content">
        </div>

        </div> 
    )
}

export default MovieReviews;