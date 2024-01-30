import "./Card.css";

function Card({id, title, description, image, rating, releaseDate}) {
  return (
    <div className="row-of-tiles">
    <div key={id} className="card">
      <header className="title">{title}</header>
      <img className="poster" src={image} alt={title} />
      <p id="description"><span>Overview: </span>{description}</p>
      <p><span>Raiting:</span> {parseInt(rating)} /10</p>
      <p><span>Released:</span> {releaseDate}</p>
    </div>
    </div>
  );
}

export default Card;