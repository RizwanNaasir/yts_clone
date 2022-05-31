import React from 'react';
import {Link} from "react-router-dom";

const List = (props) => {
    const {movies} = props;
    if (!movies || movies.length === 0) return <p>No movies, sorry</p>;
    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
            {movies.map((movies) => (
                <li
                    key={movies.id}
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                    {/*<Link*/}
                    {/*    to={`/detail/${movies.id}`*/}
                    {/*}>*/}
                        <div className="flex-1 flex flex-col p-8">
                            <img className="w-full mx-auto rounded-lg shadow-2xl
                            " src={movies.large_cover_image} alt=""/>
                            <h3 className="mt-6 text-gray-900 text-lg font-medium">{movies.title}</h3>
                            <dl className="mt-1 flex-grow flex flex-col justify-between">
                                <div className="flex-1 flex-row">
                                    {movies.genres.map((genre) => (
                                        <span className="text-gray-500 text-sm px-1">{genre}</span>
                                    ))}
                                </div>
                                <dt className="sr-only">Year</dt>
                                <dd className="text-gray-900 text-sm text-bold">{movies.year}</dd>
                                <dt className="sr-only">Role</dt>
                                <dd className="mt-3">
                                <span
                                    className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                  {movies.rating}
                                </span>
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
                    {/*</Link>*/}
                </li>
            ))}
        </ul>
    )
}
export default List;
