import "./MovieReviews.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getReviewsByMovieId, addReview, getReview } from "../../Backend-calls.js";


function MovieReviews() {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null); // State to hold the movie data
    const [reviews, setReviews] = useState([]); // State to hold the reviews
    const [user, setUser] = useState(""); // State to hold the user name
    const [review, setReview] = useState(""); // State to hold the review text
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
    const [currentReview, setCurrentReview] = useState(null); // State to hold the current review

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

    useEffect(() => {
        async function fetchReviews() {
            try {
                const data = await getReviewsByMovieId(id); // Fetch the reviews using the backend call
                setReviews(data); // Store the reviews in state
            } catch (error) {
                console.error("Could not fetch reviews:", error);
            }
        }

        fetchReviews();
    }, [id]); // Dependency array with the ID to refetch when it changes

    // Add a review
    async function handleAddReview(event) {
        event.preventDefault();
        const data = await addReview(id, user, review); // Add the review using the backend call
        console.log(data);
        if (data.ok) {
            const reviews = await getReviewsByMovieId(id); // Fetch the reviews again to update the list
            setReviews(reviews);
            console.log("Review added successfully");
        } else {
            console.error("Could not add review:", data.error);
    }}


// Edit review button, When clicked open modal, Get review information, Populate edit form, Make edits, Update/save, Put sent, Edited review diplayed 

    // Open the modal and get the review information
    async function handleGetReviewInfo(reviewId) {
        setIsModalOpen(true); // Open the modal
        const data = await getReview(reviewId); // Get the review information using the backend call
        console.log(data);
        setCurrentReview(data); // Store the review information in state
    
    }



    
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
                            <p><span className="card-rating">Rating: </span> {(movie.vote_average).toFixed(1)} / 10</p>
                            <p><span className="card-vote-count">Votes: </span> {movie.vote_count}</p>
                            <p><span className="card-released">Released: </span> {movie.release_date}</p>
                        </div>

                    </div>
            )}

            <div className="card-reviews-area">

                <div className="card-reviews">
                <h1 className="reviews-header">Reviews</h1>
                {reviews && reviews.map((review, index) => (
                        <div key={index} className="card-review">
                            <p><span className="card-review-user">User: </span>{review.user}</p>
                            <p><span className="card-review-text">Review: </span>{review.review}</p>
                            <button onClick={() => handleGetReviewInfo(review.id)} className="edit-button" >Edit</button>
                        </div>
                    ))}
                <div className="no-reviews">
                    {reviews.length === 0 && <p>No reviews yet</p>}
                </div>
                </div>


                <div className="addReview">
                    <h1>Add a Review</h1>
                    <p>Review form will be displayed here</p>
                    <form onSubmit={handleAddReview}>
                        <input 
                            onChange = {e => setUser(e.target.value)}
                            type="text" 
                            placeholder="Your name" 
                            className="input-name" />
                        <textarea 
                            onChange = {e => setReview(e.target.value)}
                            className="text-input"  
                            placeholder="Your review" />
                        <button 
                            className="reviewButton" 
                            type="submit">Submit</button>
                    </form>
                </div>

            </div>
                        
                {/* Modal for editing reviews */}
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                            <h2>Edit Review</h2>
                            {currentReview && (
                                <form onSubmit={handleAddReview}>
                                    <input 
                                        onChange = {e => setUser(e.target.value)}
                                        type="text" 
                                        placeholder="Your name" 
                                        className="input-name" 
                                        value={currentReview.user} />
                                    <textarea 
                                        onChange = {e => setReview(e.target.value)}
                                        className="text-input"  
                                        placeholder="Your review" 
                                        value={currentReview.review} />
                                    <button 
                                        className="reviewButton" 
                                        type="submit">Save</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
        </div>
    );
}

export default MovieReviews;
