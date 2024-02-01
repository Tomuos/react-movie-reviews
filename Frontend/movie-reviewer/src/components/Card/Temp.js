import { useState } from "react";

function Card({ id, title, description, image, rating, releaseDate }) {
    // Limit for the show less functionality
    const DESCRIPTION_LIMIT = 100;
    const [isExpanded, setIsExpanded] = useState(false);
    const [truncatedDescription, setTruncatedDescription] = useState(description.slice(0, DESCRIPTION_LIMIT) + '...');

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="row-of-tiles">
            <div key={id} className="card">
                <header className="title">{title}</header>
                <img className="poster" src={image} alt={title} />
                <div id="description">
                    <span>Overview: </span>
                    {isExpanded ? description : truncatedDescription}
                    <button onClick={toggleDescription}>
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                </div>
                <p><span>Rating:</span> {parseInt(rating)} / 10</p>
                <p><span>Released:</span> {releaseDate}</p>
            </div>
        </div>
    );
}

export default Card;