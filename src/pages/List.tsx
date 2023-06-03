import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from "framer-motion"
import {Movie} from "../types/Movie";
import NotFound from "./NotFound";
import CoverImage from "../static/300x450.webp";

const List = (props: { movies: Movie[] | null }) => {
    const {movies} = props;
    if (!movies || movies.length === 0)
        return <NotFound/>;
    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-6">
            {movies.map((movie, index) => (
                <motion.li
                    initial={{opacity: 0, y: 100}} // Start with opacity 0 and y position 100 (below the container)
                    animate={{opacity: 1, y: 0}} // Animate opacity to 1 and y position to 0 (default position)
                    exit={{
                        opacity: 0,
                        y: 100
                    }} // Exit animation with opacity 0 and y position 100 (below the container)
                    key={index}
                    className="col-span-1 flex flex-col text-center rounded-lg divide-y divide-gray-200"
                >
                    <div className="flex-1 flex flex-col p-3 relative">
                        <Link to={`/details/${movie.id}`}
                              state={{data: movie}}>
                            <img className="w-full mx-auto rounded-lg shadow-2xl
                            " src={movie.large_cover_image} alt="" onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = CoverImage;
                            }}/>
                            <h3 className="mt-6 text-gray-900 text-lg font-medium">{movie.title} | {movie.year}</h3>
                        </Link>
                        <a
                            href={'//imdb.com/title/' + movie.imdb_code}
                            target="_blank"
                            className="px-1 py-0.5 rounded-md absolute top-0 right-0 shadow-lg text-sm font-medium bg-yellow-200 text-yellow-800">
                            {movie.rating}
                            <span className="text-xs text-gray-500">
                                    /10
                                </span>
                        </a>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <div className="flex-1 flex-row">
                                {movie.genres?.map((genre, index) => (
                                    <span
                                        className="inline-flex items-center rounded-md bg-blue-100 m-1 px-1.5 py-0.5 text-xs font-medium text-blue-700  ring-1 ring-inset ring-blue-700/10"
                                        key={index}>{genre}</span>
                                ))}
                            </div>
                        </dl>
                    </div>

                </motion.li>
            ))}
        </ul>
    )
}
export default List;
