"use client"
import React, {useState} from 'react';
import Slider from "react-slick";

// @ts-ignore
const MovieDetail = ({data}) => {

    //#region states

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
                breakpoint: 992,
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

    return (
        <section className="detail-section">
            <div className="content-container">
                <div className="top-content relative">
                    {data?.backdrop_path ? (
                            <img style={{width: "100%"}} className={"movie-card__body__image"}
                                 alt='poster'
                                 src={`https://image.tmdb.org/t/p/w400/${data?.backdrop_path}`}
                            />
                        ) :

                        <div className={"no-image-poster"}>
                            <div
                                className={"not-data"}> Not yet available..
                            </div>
                        </div>
                    }
                </div>
                <div>
                <ul className="breadcrumb">
                        <li><a href="/">Home</a></li>
                        &nbsp; / &nbsp;
                        <li className={"breadcrumb__active"}> {data?.original_title}</li>
                    </ul>
                    <h1 className="title-lg-bold">
                        {data?.original_title}
                    </h1>
                    <ul className={"detail__genres"}>
                        {data.genres.map((genre: {
                            id: React.Key | null | undefined;
                            name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
                        }) => (
                            <li key={genre.id} className={"detail__genres__genre"}>
                                {genre.name}
                            </li>
                        ))
                        }
                    </ul>
                </div>
                <div className="detail">
                    <div>
                        <div>
                            {data.overview}
                        </div>

                        <div className="read-more-link">
                            <div>
                                {data.release_date}
                            </div>
                        </div>
                    </div>

                </div>
                <div className={"read-more"}>
                    <h2>
                        Production Companies
                    </h2>
                    {data?.production_companies?.length > 3 &&
                        <ul className={"read-more-list-ul"}>
                            <Slider {...SliderSettings}>
                                {data.production_companies.map((company: {
                                    id: React.Key | null | undefined;
                                    logo_path: any;
                                    name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
                                }) => (
                                    <li key={company.id} className={"read-more-list-li"}>
                                        {company?.logo_path && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w400/${company?.logo_path}`}
                                                alt="logo-image"
                                                className="rounded"
                                                width={112}
                                                height={68}
                                            />
                                        )}
                                        {!company?.logo_path && (
                                            <div className={"no-image"}>
                                                {company ? 'no poster available' : 'Loading ...'}
                                            </div>
                                        )}
                                        <div className={"read-more-list-li-a"}>    {company.name}</div>
                                    </li>
                                ))
                                }
                            </Slider>
                            <div
                                className={"not-data"}>  {data.production_companies.length <= 0 && " Not yet available.."}</div>
                        </ul>


                    }

                    {data?.production_companies?.length <= 3 &&
                        <ul className={"read-more-list-ul company-list"}>
                            {data.production_companies.map((company: {
                                id: React.Key | null | undefined;
                                logo_path: any;
                                name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
                            }) => (
                                <li key={company.id} className={"read-more-list-li"}>
                                    {company?.logo_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w400/${company?.logo_path}`}
                                            alt="logo-image"
                                            className="rounded"
                                            width={112}
                                            height={68}
                                        />
                                    )}
                                    {!company?.logo_path && (
                                        <div className={"no-image"}>
                                            {company ? 'no poster available' : 'Loading ...'}
                                        </div>
                                    )}
                                    <div className={"read-more-list-li-a"}>    {company.name}</div>
                                </li>
                            ))
                            }
                        </ul>
                    }


                </div>
            </div>
        </section>
    );
};

export default MovieDetail;
