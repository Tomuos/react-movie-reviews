import "./Card.css";

function Card({id, title, description, image, rating, releaseDate}) {
  return (
    <div key={id} className="card">
      <header>{title}</header>
      <img src={image} alt={title} />
      <p>{description}</p>
      <p>{rating}</p>
      <p>{releaseDate}</p>
    </div>
  );
}

export default Card;