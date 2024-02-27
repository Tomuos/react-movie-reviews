import "./Card.css";
// import { useState } from "react";
import { Link } from 'react-router-dom';

function Card({ id, title, description, image, rating, releaseDate }) {

    function adjustTitleFontSize(title) {
        const maxTitleLength = 15; // Define the max length of title before resizing
        const fontSize = title.length > maxTitleLength ? 'smaller-font-size' : 'normal-font-size';
        return fontSize;
    }
    
    return (
        <div className="row-of-tiles">
            <div className="card">
            <Link to={`/movie/${id}/info`} className="info-button">
                <div className={`title ${adjustTitleFontSize(title)}`}>{title}</div>
            </Link>
                <img className="poster" src={image} alt={title} />
                <Link to={`/movie/${id}`} className="reviews-button">Reviews</Link>
                <div id="description">
                    <span>Overview: </span>
                    {description}
                </div>
                <p><span className="rating" >Rating:</span> {(rating).toFixed(1)} / 10</p>
                <p><span className="released">Released:</span> {releaseDate}</p>
            </div>
        </div>
    );
}

export default Card;
