import React from 'react';
import { useRouter } from "next/navigation";


const MovieCard = ({type, movie, dataType}) => {

    //#region states

    const router = useRouter();

    //#endregion

    //#region functions

    function handleClick() {
        let path;
        if (dataType === "popularMovies") {
            path = `/movie/popular-movies/${movie.id}`;
        } else {
            path = `movie/popular-tv-series/${movie.id}`;
        }
        router.push(path);
    }

    //#endregion

    let headerContentBackgroundColor;
    let headerContentColor;
    switch (type) {
        case "header":
            headerContentBackgroundColor = "rgb(229, 229, 229)";
            headerContentColor = "#000";
            break;
        default:
            headerContentBackgroundColor = "#24123A";
            headerContentColor = "white";
    }

    let bodyContentBackgroundColor;
    switch (type) {
        case "header":
            bodyContentBackgroundColor = "rgba(0, 0, 0, 0.69)";
            break;
        default:
            bodyContentBackgroundColor =  "rgba(36, 18, 58, 0.76)";
    }

    const roundedVoteAverage = (voteAverage) => {
        return Math.round(voteAverage * 10) / 10;
    }

    return (
        <div className={"movie-card"}>
            <div className={"movie-card__header"}>
                <div className={"movie-card__header__content"}
                     style={{background: headerContentBackgroundColor, color: headerContentColor}}>
                    <span>{roundedVoteAverage(movie?.vote_average)}</span>&nbsp;/&nbsp;<span>10</span>
                </div>
            </div>
            <button onClick={handleClick} className={"movie-card__body"}>
                    {movie?.poster_path && (
                        <img style={{width: "100%"}} className={"movie-card__body__image"}
                             alt='poster'
                             src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
                        />
                    )}
                    {!movie?.poster_path && (
                        <div className={"no-image-poster-movie-card"}>
                            {movie ? 'no poster available' : 'Loading ...'}
                        </div>
                    )}
                    <div className={"movie-card__body__content"} style={{background: bodyContentBackgroundColor}}>
                        {movie?.title ? movie.title : movie?.name }
                    </div>
            </button>
        </div>
);
};

export default MovieCard;
