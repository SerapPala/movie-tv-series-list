import React from 'react';
import Link from "next/link";

const Footer = () => {

    return (
        <footer className={"footer container"}>
                <div className={"content-container"}>
                    <div className={"footer__content"}>
                        <div className={"designer"}>
                            Serap Pala
                        </div>
                        <div className={"social"}>
                            <ul>
                                <li>
                                    <Link target={"_blank"}
                                          href={"https://www.linkedin.com/in/serap-pala/"}>LinkedIn</Link>
                                </li>
                                <li>
                                    <Link target={"_blank"} href={"https://github.com/SerapPala"}>Github</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </footer>
    );
};

export default Footer;
