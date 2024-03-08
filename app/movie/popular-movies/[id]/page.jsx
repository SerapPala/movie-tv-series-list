import React from "react";
import "@/styles/scss/main.scss";
import Navbar from "@/components/Layouts/Navbar";
import MovieDetail from "@/components/MovieDetail";

//#region API endpoint and headers

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AUTHORIZATION_ID = process.env.NEXT_PUBLIC_AUTHORIZATION_ID;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AUTHORIZATION_ID}`
    },
    next: {
        revalidate: 60,
    },
};

//#endregion

//#region fetch Data

async function getData(id) {
    const url = await fetch(
        `${API_URL}movie/${id}?language=en-US&include_adult=false`,
        options,
    );
    return url.json();
}

//#endregion

const Page = async ({ params }) => {
    const data = await getData(params.id);
    return (
        <section className={"content-container"}>
  <div className={"detail_nav"}>
                <Navbar />
            </div>
            <MovieDetail data={data} />
        </section>
    );
};

export default Page;
