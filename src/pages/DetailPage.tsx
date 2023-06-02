import React from 'react';
import {QuestionMarkCircleIcon} from '@heroicons/react/solid'
import {motion} from "framer-motion";
import {Movie, TorrentsEntity} from "../types/Movie";
import Loading from "../components/Loading";

type detailPageProps = {
    movie: Movie;
    suggestions: any;
};

const detailPage = (props: detailPageProps) => {

    const {movie} = props;
    if (!movie)
        return <Loading/>;
    return (<>
            <img className="w-full min-h-full object-cover fixed" src={movie.background_image_original} alt=""/>
            <div className="min-h-full absolute inset-0">
                <a
                    href={"/"}
                    className="ml-3 fixed bottom-4 z-50 right-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Back to Home
                </a>
                <motion.main
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    className="py-10">
                    {/* Page header */}
                    <div
                        className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center space-x-5">
                            <div>
                                <h1 className="text-4xl font-bold text-white mix-blend-difference">{movie.title}</h1>
                                <p className="my-2 font-bold text-white mix-blend-difference">{movie.year}</p>
                                {movie.genres?.map((genre, index) => (
                                    <span key={index}
                                          className="inline-flex items-center px-2.5 mr-2 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                    {genre}
                                </span>
                                ))}
                                {/*<button*/}
                                {/*    onClick={() => {MovieID(movie.id)}}*/}
                                {/*    type="button"*/}
                                {/*    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"*/}
                                {/*>*/}
                                {/*    Add to Watchlist*/}
                                {/*</button>*/}
                            </div>
                        </div>
                        <div
                            className="mt-6 flex flex-col-row overflow-x-visible justify-stretch space-x-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                            {movie.torrents?.map((item: TorrentsEntity, index) => (
                                <a
                                    key={index}
                                    href={`magnet:?xt=urn:btih:${item.hash}&dn=${movie.title}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`}
                                >
                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                    >
                                        {item.quality}
                                    </button>
                                </a>
                            ))}
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
                                        <a href={'//imdb.com/title/' + movie.imdb_code}>
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
                            <section aria-labelledby="cast">
                                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                        <div className="flex space-x-3">
                                            <div className="flex-shrink-0">
                                                <img className="h-10 w-10 rounded-full" src="" alt=""/>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <form action="#">
                                                    <div>
                                                        <label htmlFor="comment" className="sr-only">
                                                            About
                                                        </label>
                                                        <textarea
                                                            id="comment"
                                                            name="comment"
                                                            rows={3}
                                                            className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                                                            placeholder="Add a note"
                                                            defaultValue={''}
                                                        />
                                                    </div>
                                                    <div className="mt-3 flex items-center justify-between">
                                                        <a
                                                            href="#"
                                                            className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                                                        >
                                                            <QuestionMarkCircleIcon
                                                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                            <span>Some HTML is okay.</span>
                                                        </a>
                                                        <button
                                                            type="submit"
                                                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                        >
                                                            Comment
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>


                    </div>
                </motion.main>
            </div>
        </>
    )
}
export default detailPage;
