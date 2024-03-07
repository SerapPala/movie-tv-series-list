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


    useEffect(() => {
        const handleScroll = () => {
            const headerNav = document.querySelector('.nav');
            if (window.scrollY > 60) {
                headerNav.classList.add('scrolled');
            } else {
                headerNav.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
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
                            <MovieCard dataType={"popularTvSeries"}  movie={popularTvSeries[Math.floor(Math.random() * popularTvSeries.length)]} type={'header'}/>
                        </div>
                    </div>
                    <div className={'header__contentMobile'}>
                        <div className={'header__contentMobile__center'}>
                            <div>
                                <span>Welcome to the</span>
                                <h1>World of TV Series & Movies</h1>
                            </div>
                        </div>
                        <MovieCard dataType={"popularTvSeries"}  movie={popularTvSeries[Math.floor(Math.random() * popularTvSeries.length)]} type={'header'}/>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
