import "./Card.css";
// import { useState } from "react";
import { Link } from 'react-router-dom';

function Card({ id, title, description, image, rating, releaseDate }) {
    // const DESCRIPTION_LIMIT = 100;
    // const [isExpanded, setIsExpanded] = useState(false);
    // const showMore = description.length > DESCRIPTION_LIMIT;
    // const displayedDescription = isExpanded || !showMore ? description : description.slice(0, DESCRIPTION_LIMIT) + '...';

    // const toggleDescription = () => {
    //     setIsExpanded(!isExpanded);
    // };
    function adjustTitleFontSize(title) {
        const maxTitleLength = 15; // Define the max length of title before resizing
        const fontSize = title.length > maxTitleLength ? 'smaller-font-size' : 'normal-font-size';
        return fontSize;
    }
    
    return (
        <div className="row-of-tiles">
            <div className="card">
            <div className={`title ${adjustTitleFontSize(title)}`}>{title}</div>
                <img className="poster" src={image} alt={title} />
                <Link to={`/movie/${id}`} className="reviews-button">Reviews</Link>
                <div id="description">
                    <span>Overview: </span>
                    {description}
                    {/* {showMore && (
                        <button className={isExpanded ? 'show-less' : 'show-more'} onClick={toggleDescription}>
                            {isExpanded ? 'Show Less' : 'Show More'}
                            
                        </button>
                    )} */}
                </div>
                <p><span className="rating" >Rating:</span> {(rating).toFixed(1)} / 10</p>
                <p><span className="released">Released:</span> {releaseDate}</p>
            </div>
        </div>
    );
}

export default Card;
