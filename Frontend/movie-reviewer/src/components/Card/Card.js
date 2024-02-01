import "./Card.css";
import ShowMoreText from "react-show-more-text";
import { useState } from "react";

function Card({id, title, description, image, rating, releaseDate}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="row-of-tiles">
    <div key={id} className="card">
      <header className="title">{title}</header>
      <img className="poster" src={image} alt={title} />
      <ShowMoreText
        lines={3}
        more="Show more"
        less="Show less"
        className="content-css"
        anchorClass="my-anchor-css-class"
        id="show-more-film-description"
        isExpanded={false}
        fontSize="1rem"
        // width={280}
        onClick={() => setIsExpanded(!isExpanded)}
        >
        <p id="description"><span className="overview" >Overview: </span>{description}</p>
      </ShowMoreText>
      <p><span className="rating">Rating:</span> {parseInt(rating)} /10</p>
      <p><span className="released">Released:</span> {releaseDate}</p>
    </div>
    </div>
  );
}

export default Card;