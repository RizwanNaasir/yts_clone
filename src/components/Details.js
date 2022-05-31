import React, {useEffect, useState} from 'react';
import List from './List';
import withListLoading from './withListLoading';

const Details = (props) => {
    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
        loading: false,
        movie: null,
    });

    useEffect(() => {
            setAppState({loading: true});
            const apiUrl = `https://yts.mx/api/v2/movie_details.json`;
            //add search query to url
            const Url = `${apiUrl}?movie_id=${props.match.params.id}`;
            fetch(Url)
                .then((response) => response.json())
                .then((data) => {
                        setAppState({
                            loading: false,
                            movie: data.data.movie,
                        });
                    }
                );
        },
        [setAppState]);
    const { movie } = props;
  return (
        <div>
            <h1>Details</h1>
        </div>
        // <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
        //     <div className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
        //         <div className="flex-1 flex flex-col p-8">
        //             <img className="w-full mx-auto rounded-lg shadow-2xl" src={movie.large_cover_image} alt="" />
        //             <h3 className="mt-6 text-gray-900 text-lg font-medium">{movie.title}</h3>
        //             <dl className="mt-1 flex-grow flex flex-col justify-between">
        //                 <div className="flex-1 flex-row">
        //                     {movie.genres.map((genre) => (
        //                         <span className="text-gray-500 text-sm px-1">{genre}</span>
        //                     ))}
        //                 </div>
        //                 <dt className="sr-only">Year</dt>
        //                 <dd className="text-gray-900 text-sm text-bold">{movie.year}</dd>
        //                 <dt className="sr-only">Role</dt>
        //                 <dd className="mt-3">
        //                     <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
        //                         {movie.rating}
        //                     </span>
        //                 </dd>
        //             </dl>
        //         </div>
        //         <div>
        //             <div className="-mt-px flex divide-x divide-gray-200">
        //                 {movie.torrents.map((movie) => (
        //                     <div className="w-0 flex-1 flex">
        //                         <a
        //                             href={`magnet:?xt=urn:btih:${movie.hash}&dn=${movie.title}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`}
        //                             className="flex-1 p-2 text-center text-gray-500 hover:text-gray-700"
        //                             target="_blank"
        //                             rel="noopener noreferrer"
        //                         >
        //                             <span className="w-6 h-6 inline-block mb-1">
        //                                 <svg
        //                                     className="fill-current"
        //                                     xmlns="http://www.w3.org/2000/svg"
        //                                     viewBox="0 0 20 20"
        //                                 >
        //                                     <path d="M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L5.414 10l6.293-6.293a1 1 0 0 0 0-1.414z" />
        //                                 </svg>
        //                             </span>
        //                             </a>
        //                         <span className="w-6 h-6 inline-block mb-1">
        //                             <svg
        //                                 className="fill-current"
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 viewBox="0 0 20 20"
        //                             >
        //                                 <path d="M10.707 2.293a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7A.997.997 0 0 1 0 2.293l7-7a.999.999 0 0 1 1.414 0l7 7a.997.997 0 0 1 0 1.414z" />
        //                             </svg>
        //                         </span>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};
export  default Details;
