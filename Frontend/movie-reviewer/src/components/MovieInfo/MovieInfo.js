import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieInfo() {
    const { id } = useParams();
    const API_Key = process.env.REACT_APP_API_KEY;
    const [movieInfo, setMovieInfo] = useState(null);
    const [castInfo, setCastInfo] = useState(null);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        async function fetchMovieInfo() {
            const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_Key}&language=en-US`);
            const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_Key}&language=en-US`);
            const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_Key}&language=en-US`);
            const movieData = await movieResponse.json();
            const castData = await castResponse.json();
            const videoData = await videoResponse.json();
            setVideo(videoData);
            // console.log("video data",videoData);
            setMovieInfo(movieData);
            // console.log("movie data",movieData);
            setCastInfo(castData);
            // console.log("cast data",castData);
        }

        fetchMovieInfo(); 
    }, [id, API_Key]);


    return (
        <div>
            <h1>Movie Info</h1>
            <div>
                {movieInfo && <h2>{movieInfo.title}</h2>}
                {movieInfo && <p>{movieInfo.overview}</p>}
                {movieInfo && <img src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} alt={movieInfo.title} />}
                {movieInfo && <p>Rating: {movieInfo.vote_average} / 10</p>}
                {movieInfo && <p>Released: {movieInfo.release_date}</p>}
                {movieInfo && <p>Runtime: {movieInfo.runtime} minutes</p>}
                {video && <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.results[video.results.length-1].key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
                {castInfo && <h2>Cast</h2>}
                {castInfo && castInfo.cast.map((actor, index) => {
                    if (index < 5) {
                        return (
                            <div key={actor.id}>
                                <p>{actor.name} as {actor.character}</p>
                            </div>
                        )
                    }
                    return null;
                })}
            </div>

        </div>
    )
}

export default MovieInfo;