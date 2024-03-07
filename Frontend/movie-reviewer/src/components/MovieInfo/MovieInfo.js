import './MovieInfo.css';
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
            console.log("cast data",castData);
        }

        fetchMovieInfo(); 
    }, [id, API_Key]);


    return (
        <div className='movie-container'>
            <h1>Movie Info</h1>

            <div className='grid-container'>
                <div className='movie-details-poster'>
                    <div className='movie-poster'>
                        {movieInfo && <img src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} alt={movieInfo.title} />}
                    </div>
                    <div className='movie-details'>
                        {movieInfo && <h2>{movieInfo.title}</h2>}
                        {movieInfo && <p>{movieInfo.overview}</p>}
                        {movieInfo && <p>Rating: {movieInfo.vote_average} / 10</p>}
                        {movieInfo && <p>Released: {movieInfo.release_date}</p>}
                        {movieInfo && <p>Runtime: {movieInfo.runtime} minutes</p>}
                    </div>
                </div>

                <div className='trailer-movie-cast'>
                    <div className='trailer'>
                        {video && <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.results[video.results.length-1].key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
                    </div>

                    <div className='movie-cast'>
                        {castInfo && <h2>Top Cast</h2>}
                        {castInfo && castInfo.cast.map((actor, index) => {
                            if (index < 10) {
                                return (
                                    <div key={actor.id} className="actor-portrait">
                                        {actor.profile_path && <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />}
                                        {!actor.profile_path && <img src="/images/user.png" alt={actor.name} />}
                                        <div className="actor-info">
                                            <p>{actor.name}</p>
                                            <p>{actor.character}</p>
                                        </div>
                                    </div>
                                )
                            }
                        return null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo;