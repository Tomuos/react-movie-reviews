export const getReviews = async (movieId) => {
    const response = await fetch(`http://localhost:8000/api/v1/reviews/movie/${movieId}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}