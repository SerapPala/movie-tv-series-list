"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import banner_background_image from '@/public/image/banner-bg.png';
import Navbar from '@/components/Layouts/Navbar';
import MovieCard from '@/components/Card/MovieCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Header = () => {

    //#region states

    const [popularMovies, setPopularMovies] = useState([]);

    const [popularTvSeries, setPopularTvSeries] = useState([]);

    const  SliderSettings = {
        infinite: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        pagination: true,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            }
        ],
    };

    //#endregion

    //#region getData functions


    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch(`${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`, options);
                const data = await response.json();
                setPopularMovies(data.results.filter(movie => movie.vote_average > 8));
            } catch (error) {
                console.error(error);
            }
        };

        const fetchPopularTvSeries = async () => {
            try {
                const response = await fetch(`${API_URL}/discover/tv?include_adult=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=200`, options);
                const data = await response.json();
                setPopularTvSeries(data.results.filter(series => series.vote_average > 8));
            } catch (error) {
                console.error(error);
            }
        };

        fetchPopularMovies();
        fetchPopularTvSeries();
    }, []);

    //#endregion

        return (
        <div className={'header'}>
            <header>
                <Image priority={true} src={banner_background_image} className={'header__backgroundImage'} alt="background" />
                <div className={'content-container'}>
                    <Navbar/>
                    <div className={'header__content'}>
                        <div className={'header__content__left'}>
                            <MovieCard dataType={"popularMovies"} movie={popularMovies[Math.floor(Math.random() * popularMovies.length)]} type={'header'}/>
                        </div>
                        <div className={'header__content__center'}>
                            <div>
                                <span>Welcome to the</span>
                                <h1>World of TV Series & Movies</h1>
                            </div>
                        </div>
                        <div className={'header__content__right'}>
                            <MovieCard dataType={"popularTvSeries"}  movie={popularTvSeries[Math.floor(Math.random() * popularTvSeries.length)]}  type={'header'}/>
                        </div>
                    </div>
                    <div className={'header__contentMobile'}>
                        <div className={'header__contentMobile__center'}>
                            <div>
                                <span>Welcome to the</span>
                                <h1>World of TV Series & Movies</h1>
                            </div>
                        </div>
                        <Slider {...SliderSettings}>
                            <div className={"slider-item"}>
                                <MovieCard dataType={"popularMovies"}
                                           movie={popularMovies[Math.floor(Math.random() * popularMovies.length)]}
                                           type={'header'}/>
                            </div>
                            <div className={"slider-item"}>
                                <MovieCard dataType={"popularTvSeries"}
                                           movie={popularTvSeries[Math.floor(Math.random() * popularTvSeries.length)]}
                                           type={'header'}/>
                            </div>
                        </Slider>
                    </div>
                </div>
            </header>
        </div>
        );
};

export default Header;
