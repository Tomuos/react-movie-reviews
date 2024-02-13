export const getReviewsByMovieId = async (movieId) => {
    const response = await fetch(`http://localhost:8000/api/v1/reviews/movie/${movieId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export const addReview = async (movieId, user, review) => {
    const response = await fetch(`http://localhost:8000/api/v1/reviews/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            movieId: movieId,
            user: user,
            review: review,
        }),
    });
    if (response.ok) {
        return response;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

export const getReview = async (reviewId) => {
    const response = await fetch(`http://localhost:8000/api/v1/reviews/${reviewId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}