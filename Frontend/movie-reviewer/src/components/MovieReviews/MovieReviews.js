import "./MovieReviews.css";
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from "react";

function MovieReviews({movie}) {
    
        return (
        <div>
        <div className="movie-information">
            <h1>Movie Information</h1>
            {movie && <div key={movie.id} className="card">
                <header className="title">{movie.title}</header>
                <img className="poster" src={movie.image} alt={movie.title} />
                <div id="description">
                    <span>Overview: </span>
                    {movie.description}
                </div>
                <p><span className="rating" >Rating:</span> {parseInt(movie.rating)} / 10</p>
                <p><span className="vote-count" >Votes:</span>{movie.vote_count}</p>
                <p><span className="released">Released:</span> {movie.releaseDate}</p>
            </div>}
        </div>

        <div className="reviews-content">
        </div>

        </div> 
    )
}

export default MovieReviews;