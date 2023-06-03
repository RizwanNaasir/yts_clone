import React from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {Movie} from "../types/Movie";
import Loading from "../components/Loading";
import CoverImage from "../static/300x450.webp";
import TorrentOptions from "../components/TorrentOptions";

type detailPageProps = {
    movie: Movie;
    suggestions: any;
};

const detailPage = (props: detailPageProps) => {

    const {movie} = props;
    if (!movie)
        return <Loading/>;
    return (
        <>
            <img className="w-full min-h-full object-cover fixed" src={movie.background_image_original} alt=""/>
            <div className="min-h-full absolute inset-0">
                <a
                    href={"/"}
                    className="ml-3 fixed bottom-4 z-50 right-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Back to Home
                </a>
                <AnimatePresence>
                    <motion.main
                        initial={{opacity: 0, y: 100}} // Start with opacity 0 and y position 100 (below the container)
                        animate={{opacity: 1, y: 0}} // Animate opacity to 1 and y position to 0 (default position)
                        exit={{
                            opacity: 0,
                            y: 100
                        }} // Exit animation with opacity 0 and y position 100 (below the container)
                        className="py-10">
                        {/* Page header */}
                        <div
                            className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                            <div className="flex items-center space-x-5">
                                <div>
                                    <div className="flex flex-row">
                                        <h1 className="text-4xl font-bold text-white mix-blend-difference mr-2">{movie.title}</h1>
                                        <TorrentOptions options={movie.torrents} movieTitle={movie.title}/>
                                    </div>
                                    <p className="my-2 font-bold text-white mix-blend-difference">{movie.year}</p>
                                    {movie.genres?.map((genre, index) => (
                                        <span key={index}
                                              className="inline-flex items-center rounded-md bg-blue-100 m-1 px-1.5 py-0.5 text-xs font-medium text-blue-700  ring-1 ring-inset ring-blue-700/10">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div
                            className="mt-3 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                            <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                                <div className="my-6 flow-root">
                                    <img
                                        className="h-full w-full rounded-lg"
                                        src={movie.large_cover_image}
                                        alt=""
                                        onError={(e: any) => {
                                            e.target.onerror = null;
                                            e.target.src = CoverImage;
                                        }}
                                    />
                                </div>
                            </section>
                            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                                {/* Description list*/}
                                <section aria-labelledby="applicant-information-title">
                                    <div className="bg-white shadow sm:rounded-lg">
                                        <div className="px-4 py-5 sm:px-6 relative">
                                            <h2 id="applicant-information-title"
                                                className="text-lg leading-6 font-medium text-gray-900">
                                                Title Information
                                            </h2>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Movie Details</p>
                                            <a href={'//imdb.com/title/' + movie.imdb_code} target="_blank">
                                        <span
                                            className="inline-flex items-center absolute  top-3 right-3 px-5 py-2 rounded-md text-md font-medium bg-yellow-200 text-yellow-800">
                                            {movie.rating} / 10
                                        </span>
                                            </a>
                                        </div>
                                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">

                                                <div className="sm:col-span-2">
                                                    <dt className="text-sm font-medium text-gray-500">Summary</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {movie.description_full}
                                                    </dd>
                                                </div>
                                                <div className="sm:col-span-2 rounded-2xl">
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={'//www.youtube.com/embed/' + movie.yt_trailer_code}
                                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </dl>
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="notes-title">
                                    <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                        <div className="divide-y divide-gray-200">
                                            <div className="px-4 py-5 sm:px-6">
                                                <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                                                    Cast
                                                </h2>
                                            </div>
                                            <div className="px-4 py-6 sm:px-6">
                                                <ul
                                                    role="list"
                                                    className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
                                                >
                                                    {movie.cast?.map((person, index) => (
                                                        <a href={'//imdb.com/name/nm' + person.imdb_code} key={index}
                                                           target="_blank">
                                                            <li key={person.imdb_code}>
                                                                <div className="space-y-4">
                                                                    <img
                                                                        className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24"
                                                                        src={person.url_small_image} alt=""/>
                                                                    <div className="space-y-2">
                                                                        <div className="text-xs font-medium lg:text-sm">
                                                                            <h3>{person.name}</h3>
                                                                            <p className="text-indigo-600">{person.character_name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </a>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </motion.main>
                </AnimatePresence>
            </div>
        </>
    )
}
export default detailPage;
