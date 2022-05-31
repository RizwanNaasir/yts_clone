import React, {Fragment, useEffect, useState} from 'react';
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Detail from "./components/Details";
import {SearchIcon} from "@heroicons/react/solid";
import {Button} from "@mui/material";

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    {name: 'Latest', href: '#', current: true},
    {name: 'Top ', href: '#', current: false},
    {name: 'Projects', href: '#', current: false},
    {name: 'Calendar', href: '#', current: false},
]
const userNavigation = [
    {name: 'Your Profile', href: '#'},
    {name: 'Settings', href: '#'},
    {name: 'Sign out', href: '#'},
]
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

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function App() {
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

    function movieList() {
        setAppState({loading: true});
        const apiUrl = `https://yts.mx/api/v2/list_movies.json`;
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
        fetch(`${apiUrl}?${new URLSearchParams(params)}`)
            .then((response) => response.json())
            .then((data) => {
                    setAppState({
                        loading: false,
                        movies: data.data.movies,
                        page_number: data.data,
                    });
                }
            );
    }

    useEffect(() => {
        movieList()
    }, [page, Search, Limit, Sort, Order, Genre, Quality, Rating, setAppState]);
    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-white shadow-sm">
                {({open}) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="flex-shrink-0 flex items-center">
                                        <img
                                            className="block lg:hidden h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                            alt="Workflow"
                                        />
                                        <img
                                            className="hidden lg:block h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'border-indigo-500 text-gray-900'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                    <button
                                        type="button"
                                        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button
                                                className="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={user.imageUrl}
                                                     alt=""/>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({active}) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                                <div className="-mr-2 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button
                                        className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                            'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt=""/>
                                    </div>
                                    <div className="ml-3">
                                        <div
                                            className="text-base font-medium text-gray-800">{user.name}</div>
                                        <div
                                            className="text-sm font-medium text-gray-500">{user.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <div className="py-10">
                <main className="mx-auto max-w-7xl px-4 sm:mt-16">
                    <div className="text-center">
                        <h1 className="text-6xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">YTS</span>{' '}
                            <span className="block text-indigo-600 xl:inline">on Steroids</span>
                        </h1>
                        <p className="my-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Welcome to the un-official YTS website. Here you can browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality on lightning speed..
                        </p>
                    </div>
                </main>
                <main>
                    <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
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
                        Showing <span className="font-medium">{setAppState.page_number}</span> to <span
                        className="font-medium">10</span> of{' '}
                        <span className="font-medium">20</span> results
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

export default App;
