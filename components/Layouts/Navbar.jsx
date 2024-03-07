"use client"
import React from 'react';
import Link from "next/link";

const Navbar = () => {

    return (
            <div className={"nav"}>
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
                                        <li><Link href={"/"}>Popular TV Series</Link></li>
                                        <li><Link href={"/"}>Popular Movies</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Navbar;
