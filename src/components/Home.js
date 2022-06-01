import React, {useEffect, useState,Fragment} from 'react';
import '../App.css';
import List from './List';
import withListLoading from './withListLoading';
import { Link} from "react-router-dom";
import Details from "./Details";
import API from "./API";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


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
    const [selected, setSelected] = useState(people[3]);
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

                        <div className="flex sm:flex-row flex-col justify-center z-0 gap-3 group">
                            <input
                                type="text"
                                value={Search}
                                onChange={(e) => setSearch(e.target.value)}
                                className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded-full w-full sm:py-0 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                                placeholder="Search Movies"
                            />
                            {/*<Listbox value={selected} onChange={setSelected}>*/}
                            {/*    {({ open }) => (*/}
                            {/*        <>*/}
                            {/*            <div className="relative">*/}
                            {/*                <Listbox.Button className="relative w-max bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">*/}
                            {/*                    <span className="block">{selected.name}</span>*/}
                            {/*                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">*/}
                            {/*                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                            {/*                  </span>*/}
                            {/*                </Listbox.Button>*/}

                            {/*                <Transition*/}
                            {/*                    show={open}*/}
                            {/*                    as={Fragment}*/}
                            {/*                    leave="transition ease-in duration-100"*/}
                            {/*                    leaveFrom="opacity-100"*/}
                            {/*                    leaveTo="opacity-0"*/}
                            {/*                >*/}
                            {/*                    <Listbox.Options className="absolute z-10 mt-1 w-max bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">*/}
                            {/*                        {people.map((person) => (*/}
                            {/*                            <Listbox.Option*/}
                            {/*                                key={person.id}*/}
                            {/*                                className={({ active }) =>*/}
                            {/*                                    classNames(*/}
                            {/*                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',*/}
                            {/*                                        'cursor-default select-none relative py-2 pl-8 pr-4'*/}
                            {/*                                    )*/}
                            {/*                                }*/}
                            {/*                                value={person}*/}
                            {/*                            >*/}
                            {/*                                {({ selected, active }) => (*/}
                            {/*                                    <>*/}
                            {/*                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>*/}
                            {/*                                      {person.name}*/}
                            {/*                                    </span>*/}

                            {/*                                        {selected ? (*/}
                            {/*                                            <span*/}
                            {/*                                                className={classNames(*/}
                            {/*                                                    active ? 'text-white' : 'text-indigo-600',*/}
                            {/*                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'*/}
                            {/*                                                )}*/}
                            {/*                                            >*/}
                            {/*                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />*/}
                            {/*                                          </span>*/}
                            {/*                                        ) : null}*/}
                            {/*                                    </>*/}
                            {/*                                )}*/}
                            {/*                            </Listbox.Option>*/}
                            {/*                        ))}*/}
                            {/*                    </Listbox.Options>*/}
                            {/*                </Transition>*/}
                            {/*            </div>*/}
                            {/*        </>*/}
                            {/*    )}*/}
                            {/*</Listbox>*/}
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
