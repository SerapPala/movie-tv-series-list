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
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    //#endregion

    //#region functions

    const showStars = (voteAverage: number) => {
        const roundedRating = Math.round(voteAverage);
        const remainder = voteAverage - roundedRating;
        let stars = '';

        for (let i = 1; i <= roundedRating; i++) {
            stars += '★';
        }

        if (remainder >= 0.5) {
            stars += '½';
        }

        const totalStars = Math.floor(voteAverage);
        for (let i = totalStars + 1; i < 10; i++) {
            stars += '☆';
        }

        return stars;
    }

    //#endregion

    return (
        <section className="detail-section">
            <div className="top-content relative">
                {data?.poster_path ? (
                    <img
                        style={{width: "100%"}}
                        className="detail-section__image"
                        alt="poster"
                        src={`https://image.tmdb.org/t/p/w400/${data?.poster_path}`}
                    />
                ) : (
                    <div className="no-image-poster">
                        <div className="not-data">Not yet available poster..</div>
                    </div>
                )}
                <div className="overlay"></div>
                <div className={"overlay-2"}>
                    <div className="content-container detail-section__center">
                        <div>
                            <ul className="breadcrumb">
                                <li><a href="/">Home</a></li>
                                &nbsp; / &nbsp;
                                <li className={"breadcrumb__active"}> {data?.original_title ? data?.original_title : data?.title ? data?.title :data?.name  }</li>
                            </ul>
                            <h1 className="title-lg-bold">
                                {data?.original_title ? data?.original_title : data?.title ? data?.title :data?.name  }
                            </h1>
                            <div className="read-more-link">
                                {data?.release_date}
                            </div>
                            <div className={"overview"}>
                                {data?.overview}
                            </div>
                            <div className="stars">
                                <div>{showStars(data?.vote_average)}</div>
                            </div>
                            {data?.genres &&
                                <ul className={"detail__genres"}>
                                    {data?.genres?.map((genre: {
                                        id: React.Key | null | undefined;
                                        name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined;
                                    }) => (
                                        <li key={genre.id} className={"detail__genres__genre"}>
                                            {genre.name}
                                        </li>
                                    ))
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="content-container detail-section__center">
                <div className={"read-more"}>
                    {data?.production_companies?.length >= 1 && <h2>
                        Production Companies
                    </h2>}

                    {data?.production_companies?.length > 0 &&

                        <>
                            {data?.production_companies?.length > 3 &&
                                <ul className={"read-more-list-ul"}>
                                    <Slider {...SliderSettings}>
                                        {data?.production_companies?.map((company: {
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
                        </>
                    }
                    {data?.production_companies?.length > 0 &&

                        <>
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
                        </>
                    }
                </div>
            </div>
        </section>
    );
};

export default MovieDetail;
