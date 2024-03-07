"use client"
import React from "react";
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "@/styles/scss/main.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "@/components/Card/MovieCard";
import Header from "@/components/Layouts/Header";


//#region API endpoint and headers

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AUTHORIZATION_ID = process.env.NEXT_PUBLIC_AUTHORIZATION_ID;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTHORIZATION_ID}`
    }
};

//#endregion

//#region getData functions

async function fetchPopularMovies() {
    const response = await fetch(`${API_URL}movie/popular?language=en-US&page=1`, options);
    const data = await response.json();
    return data.results;
}

async function fetchPopularTvSeries() {
    const response = await fetch(`${API_URL}/discover/tv?include_adult=false&language=en-US&page=1&sort_by=popularity.desc`, options);
    const data = await response.json();
    return data.results;
}

//#endregion

export default function SimpleSlider() {

    //#region states

    const [popularMovies, setPopularMovies] = useState([]);

    const [popularTvSeries, setPopularTvSeries] = useState([]);


    const  SliderSettings = {
        infinite: true,
        speed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        pagination: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    //#endregion

    //#region fetch data

    useEffect(() => {
        const fetchData = async () => {
            setPopularMovies(await fetchPopularMovies());
            setPopularTvSeries(await fetchPopularTvSeries());
        };
        fetchData();
    }, []);

    //#endregion

    return (
     <div>
           <Header/>
         <div className={"content-container"}>
             <section className={"section"}>
                 <h2 className={"title"}>
                     Popular Movies
                 </h2>
                 <Slider {...SliderSettings}>
                     {popularMovies.map(movie => (
                         <div key={movie.id} className="slider-item">
                             <MovieCard movie={movie} />
                         </div>
                     ))}
                 </Slider>
             </section>
             <section className={"section"}>
                 <h2 className={"title"}>
                     Popular TV Series
                 </h2>
                 <Slider {...SliderSettings}>
                     {popularTvSeries.map(series => (
                         <div key={series.id} className="slider-item">
                             <MovieCard movie={series} />
                         </div>
                     ))}
                 </Slider>
             </section>
         </div>
     </div>
    );
}
