import React, {useEffect, useState} from 'react';
import '../App.css';
import List from './List';
import withListLoading from './withListLoading';
import { Link} from "react-router-dom";
import Details from "./Details";
import API from "./API";

const genres_list = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film Noir',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Short Film',
    'Sport',
    'Superhero',
    'Thriller',
    'War',
    'Western',
]
const sort_by_list = [
    {name: 'Title', value: 'title'},
    {name: 'Year', value: 'year'},
    {name: 'Rating', value: 'rating'},
    {name: 'Peers', value: 'peers'},
    {name: 'Seeds', value: 'seeds'},
    {name: 'Most Downloaded', value: 'download_count'},
    {name: 'Most Liked', value: 'like_count'},
    {name: 'Date Added', value: 'date_added'},
]
const rating_list = ['9', '8', '7', '6', '5', '4', '3', '2', '1']
const quality_list = ['720p', '1080p', '2160p', '3D',]

function Home() {
    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
        loading: false,
        movies: null,
    });
    const [Limit, setLimit] = useState(20);
    const [Search, setSearch] = useState('');
    const [Sort, setSort] = useState('');
    const [Order, setOrder] = useState('');
    const [Genre, setGenre] = useState('');
    const [Quality, setQuality] = useState('');
    const [Rating, setRating] = useState('');
    let [page, setPage] = useState(1);
    const [totalMovies, settTotalMovies] = useState('');

    function movieList() {
        setAppState({loading: true});
        const apiUrl = `list_movies.json`;
        const params = {
            query_term: Search,
            limit: Limit,
            page: page,
            sort_by: Sort,
            order_by: Order,
            genre: Genre,
            quality: Quality,
            minimum_rating: Rating,
        }
        fetch(`${API.endpoint}${apiUrl}?${new URLSearchParams(params)}`)
            .then((response) => response.json())
            .then((data) => {
                    setLimit(data.data.limit);
                    settTotalMovies(data.data.movie_count);
                    setPage(data.data.page_number);
                    setAppState({
                        loading: false,
                        movies: data.data.movies,
                    });
                }
            );
    }

    useEffect(() => {
        movieList()
    }, [page, Search, Limit, Sort, Order, Genre, Quality, Rating, setAppState, setPage]);
    return (
        <div className="min-h-full">
            <div className="pb-10">
                <main className="mx-auto max-w-7xl px-4 sm:mt-16">
                    <div className="text-center">
                        <h1 className="text-6xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">YTS</span>{' '}
                            <span className="block text-indigo-600 xl:inline">on Steroids</span>
                        </h1>
                        <p className="my-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Welcome to the un-official YTS website. Here you can browse and download YIFY movies in
                            excellent 720p, 1080p, 2160p 4K and 3D quality on lightning speed..
                        </p>
                    </div>
                </main>
                <main>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <input
                            type="text"
                            value={Search}
                            onChange={(e) => setSearch(e.target.value)}
                            className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                            placeholder="Search Movies"
                        />
                        <div className="flex flex-row justify-center z-0 my-6 gap-3 group">
                            <div className="relative">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                    htmlFor="grid-state">
                                    Genre
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    id="grid-state"
                                    onChange={(e) => setGenre(e.target.value)}>
                                    <option value="">All</option>
                                    {genres_list.map((item) => (
                                        <option value={item} className="text-black">
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                    htmlFor="grid-state">
                                    Sort By
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    id="grid-state"
                                    onChange={(e) => setSort(e.target.value)}>
                                    <option value="">All</option>
                                    {sort_by_list.map((item) => (
                                        <option value={item.value} className="text-black">
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                    htmlFor="grid-state">
                                    Quality
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    id="grid-state"
                                    onChange={(e) => setQuality(e.target.value)}>
                                    <option value="">All</option>
                                    {quality_list.map((item) => (
                                        <option value={item} className="text-black">
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                    htmlFor="grid-state">
                                    Rating
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    id="grid-state"
                                    onChange={(e) => setRating(e.target.value)}>
                                    <option value="">All</option>
                                    {rating_list.map((item) => (
                                        <option value={item} className="text-black">
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Replace with your content */}
                        <div className="px-4 py-8 sm:px-0">
                            <div className='repo-container'>
                                <ListLoading isLoading={appState.loading} movies={appState.movies}/>
                            </div>
                        </div>
                        {/* /End replace */}
                    </div>
                </main>
            </div>
            <nav
                className="bg-white px-4 fixed bottom-0 w-full py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
            >
                <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                        Showing Page <span className="font-medium">{page}</span> of <span
                        className="font-medium">{Math.trunc(totalMovies / Limit)}</span>
                    </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                    <button
                        onClick={() => setPage(page--)}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page++)}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Home;
