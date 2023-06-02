import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from "framer-motion"
import {Movie} from "../types/Movie";
import NotFound from "./NotFound";

const List = (props: { movies: Movie[] | null }) => {
    const {movies} = props;
    if (!movies || movies.length === 0)
        return <NotFound/>;
    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-6">
            {movies.map((movie, index) => (
                <motion.li initial={{opacity: 0}}
                           animate={{opacity: 1}}
                           exit={{opacity: 0}}
                           key={index}
                           className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >

                    <div className="flex-1 flex flex-col p-3">
                        <Link to={`/details/${movie.id}`}
                              state={{data: movie}}>
                            <img className="w-full mx-auto rounded-lg shadow-2xl
                            " src={movie.large_cover_image} alt=""/>
                            <h3 className="mt-6 text-gray-900 text-lg font-medium">{movie.title}</h3>
                        </Link>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <div className="flex-1 flex-row truncate">
                                {movie.genres?.map((genre, index) => (
                                    <span className="text-gray-500 text-sm px-1" key={index}>{genre}</span>
                                ))}
                            </div>
                            <dt className="sr-only">Year</dt>
                            <dd className="text-gray-900 text-sm text-bold">{movie.year}</dd>
                            <dt className="sr-only">Role</dt>
                            <dd className="mt-3">
                                <a
                                    href={'//imdb.com/title/' + movie.imdb_code}
                                    className="px-2 py-1 rounded-md text-md font-medium bg-yellow-200 text-yellow-800">
                                    {movie.rating}
                                </a>
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            {movie.torrents?.map((torrent, index) => (
                                <div className="w-0 flex-1 flex" key={index}>
                                    <a
                                        href={`magnet:?xt=urn:btih:${torrent.hash}&dn=${movie.title}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`}
                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:shadow-outline"
                                    >
                                        <span className="ml-3">{torrent.quality}</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                </motion.li>
            ))}
        </ul>
    )
}
export default List;
