"use client"
import React, {useEffect} from 'react';
import Link from "next/link";

const Navbar = ({type}) => {

   //#region scroll Navigation function

    useEffect(() => {
        const handleScroll = () => {
            const headerNav = document.querySelector('.desktop-nav');
            if (window.scrollY > 60) {
                headerNav?.classList?.add('scrolled');
            } else {
                headerNav?.classList?.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    //#endregion

    //#region detail page navbar function
    
    const addLeadingSlash = (href) => {
        if (type === "detail" && href.startsWith("#")) {
            return "/" + href;
        }
        return href;
    };
    
    //#endregion

    return (
        <div style={{position:"relative"}}>
            {/* desktop navbar */}
            <div className={"desktop-nav"}>
                <div className="header__nav">
                    <div className={"container"}>
                        <div className={"content-container"}>
                            <div className="header__nav__content">
                                <div className={"header__nav__content__container"}>
                                    <div className={"header__nav__content__container__left"}>
                                        <Link href={"/"}><span>Logo</span></Link>
                                    </div>
                                    <div className={"header__nav__content__container__right"}>
                                        <ul>
                                            <li><Link legacyBehavior href={addLeadingSlash("#popular-tv-series")}><a>Popular TV
                                                Series</a></Link></li>
                                            <li><Link legacyBehavior href={addLeadingSlash("#popular-movies")}><a>Popular
                                                Movies</a></Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* mobile navbar */}
            <div className="mobile-nav">
                <div className={"mobile-nav__logo"}>
                    <Link href={"/"}>Logo</Link>
                </div>
                <input id="menu-toggle" type="checkbox"/>
                <label className='menu-button-container' htmlFor="menu-toggle">
                    <div className='menu-button'></div>
                </label>
                <ul className="menu">
                    <li><Link legacyBehavior href={addLeadingSlash("#popular-tv-series")}><a>Popular TV Series</a></Link></li>
                    <li><Link legacyBehavior href={addLeadingSlash("#popular-movies")}><a>Popular Movies</a></Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
