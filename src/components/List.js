import React from 'react';
import {Link} from "react-router-dom";

const List = (props) => {
    const {movies} = props;
    if (!movies || movies.length === 0)
        return <main
            className="min-h-full bg-cover bg-top sm:bg-top"
            style={{
                backgroundImage:
                    'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
                <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">404 error</p>
                <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                    Uh oh! I think you’re lost.
                </h1>
                <p className="mt-2 text-lg font-medium text-black text-opacity-50">
                    It looks like the page you’re looking for doesn't exist.
                </p>
                <div className="mt-6">
                    <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50"
                    >
                        Go back home
                    </a>
                </div>
            </div>
        </main>
            ;
    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
            {movies.map((movies) => (
                <li
                    key={movies.id}
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                   <a href={'/details/'+movies.id}>
                    <div className="flex-1 flex flex-col p-3">
                        <img className="w-full mx-auto rounded-lg shadow-2xl
                            " src={movies.large_cover_image} alt=""/>
                        <h3 className="mt-6 text-gray-900 text-lg font-medium">{movies.title}</h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <div className="flex-1 flex-row truncate">
                                {movies.genres.map((genre) => (
                                    <span className="text-gray-500 text-sm px-1">{genre}</span>
                                ))}
                            </div>
                            <dt className="sr-only">Year</dt>
                            <dd className="text-gray-900 text-sm text-bold">{movies.year}</dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                                <a
                                    href={'//imdb.com/title/' + movies.imdb_code}
                                    className="px-2 py-1 rounded-md text-md font-medium bg-yellow-200 text-yellow-800">
                                  {movies.rating}
                                </a>
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            {movies.torrents.map((movies) => (
                                <div className="w-0 flex-1 flex">
                                    <a
                                        href={`magnet:?xt=urn:btih:${movies.hash}&dn=${movies.title}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`}
                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:shadow-outline"
                                    >
                                        <span className="ml-3">{movies.quality}</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                   </a>
                </li>
            ))}
        </ul>
    )
}
export default List;
