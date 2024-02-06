import "./Card.css";
import { useState } from "react";
import { NavLink } from 'react-router-dom';


function Card({ id, title, description, image, rating, releaseDate, handleSeeReviews, apiKey }) {
    // Limit for the show less functionality
    const DESCRIPTION_LIMIT = 100;
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedDescription = description.slice(0, DESCRIPTION_LIMIT) + '...';

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

const [movie, setMovie] = useState(null);

    async function getMovie(id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        const data = await response.json();
        setMovie(data);


    return (
        <div className="row-of-tiles">
            <div key={id} className="card">
                <header className="title">{title}</header>
                <img className="poster" src={image} alt={title} />
                <NavLink to={`/movie/${id}`}
                    onClick={handleSeeReviews}
                    className="reviews-button">Reviews</NavLink>
                <div id="description">
                    <span>Overview: </span>
                    {isExpanded ? description : truncatedDescription}
                    <button onClick={toggleDescription}>
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                </div>
                <p><span className="rating" >Rating:</span> {parseInt(rating)} / 10</p>
                <p><span className="released">Released:</span> {releaseDate}</p>
            </div>
        </div>
    );
}

export default Card;