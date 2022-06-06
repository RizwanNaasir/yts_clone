import React, {useEffect, useState, Fragment} from 'react';
import {Menu, Popover, Transition, Listbox} from '@headlessui/react'
import '../App.css';
import List from './List';
import withListLoading from '../components/WithListLoading';
import API from "../components/API";
import {genres_list, sort_by_list, rating_list, quality_list, communities, TabsList, Tab, } from '../components/filterLists'
import {SearchIcon,} from '@heroicons/react/solid'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import TabsUnstyled from '@mui/base/TabsUnstyled';
import SelectSmall from "../components/MenuLists";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link} from "react-router-dom";
import {auth, logout} from "../firebase";

const userNavigation = [
    {name: 'Your Profile', href: '#'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Home() {

    const [user, loading, error] = useAuthState(auth);
    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
        loading: false,
        movies: null,
    });
    const [Limit, setLimit] = useState(9);
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
            {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
            <Popover
                as="header"
                className={({open}) =>
                    classNames(
                        open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
                        'bg-white shadow-sm lg:static lg:overflow-y-visible'
                    )
                }
            >
                {({open}) => (
                    <>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                                    <div className="flex-shrink-0 flex items-center">
                                        <a href="#">
                                            <img
                                                className="block h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500"
                                                alt="Workflow"
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                                    <div
                                        className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                                        <div className="w-full">
                                            <label htmlFor="search" className="sr-only">
                                                Search
                                            </label>
                                            <div className="relative">
                                                <div
                                                    className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                                </div>
                                                <input
                                                    value={Search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    id="search"
                                                    name="search"
                                                    className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                                                    placeholder="Search"
                                                    type="search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                                    {/* Mobile menu button */}
                                    <Popover.Button
                                        className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Popover.Button>
                                </div>
                                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                                    {user ?
                                        <>
                                            <a
                                                href="#"
                                                className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                            </a>
                                            <Menu as="div" className="flex-shrink-0 relative ml-5">
                                                <div>
                                                    <Menu.Button
                                                        className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src={user?.photoURL}
                                                             alt=""/>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                                        {userNavigation?.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({active}) => (
                                                                    <a
                                                                        href={item.href}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block py-2 px-4 text-sm text-gray-700'
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
                                            <button
                                                onClick={() => {logout()}}
                                                className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                            >
                                                Logout
                                            </button>
                                        </> :
                                        <><Link to="/register" className="text-sm font-medium text-gray-900 hover:underline">
                                            Register
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                        >
                                            Login
                                        </Link> </>}
                                </div>
                            </div>
                        </div>

                        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                                <SelectSmall
                                    onChange={setGenre}
                                    value={Genre}
                                    label="Genre"
                                    list={genres_list}
                                />
                                <SelectSmall
                                    onChange={setQuality}
                                    value={Quality}
                                    label="Quality"
                                    list={quality_list}
                                />
                                <SelectSmall
                                    onChange={setSort}
                                    value={Sort}
                                    label="Sort by"
                                    list={sort_by_list}
                                />
                                <SelectSmall
                                    onChange={setRating}
                                    value={Rating}
                                    label="Min Rating"
                                    list={rating_list}
                                />
                            </div>

                            <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
                                {user ?
                                    <>
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                                                <div className="flex-shrink-0">
                                                    <img className="h-10 w-10 rounded-full" src={user?.photoURL} alt=""/>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-base font-medium text-gray-800">{user?.displayName}</div>
                                                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                                                >
                                                    <span className="sr-only">View notifications</span>
                                                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>
                                            <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                                                {userNavigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-center">
                                            <button onClick={() => {logout()}} className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700">
                                                Logout
                                            </button>
                                        </div>
                                    </>
                                :
                                   <>
                                       <Link
                                           to="/login"
                                           className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"
                                       >
                                           Login
                                       </Link>

                                       <div className="mt-6 flex justify-center">
                                           <Link to="/register" className="text-base font-medium text-gray-900 hover:underline">
                                               Register
                                           </Link>
                                       </div>
                                   </>
                                }
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>

            <div className="py-10">
                <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
                    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                        <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
                            <div className="pb-8 space-y-3">
                                <SelectSmall
                                    onChange={setGenre}
                                    value={Genre}
                                    label="Genre"
                                    list={genres_list}
                                />
                                <SelectSmall
                                    onChange={setQuality}
                                    value={Quality}
                                    label="Quality"
                                    list={quality_list}
                                />
                                <SelectSmall
                                    onChange={setSort}
                                    value={Sort}
                                    label="Sort by"
                                    list={sort_by_list}
                                />
                                <SelectSmall
                                    onChange={setRating}
                                    value={Rating}
                                    label="Min Rating"
                                    list={rating_list}
                                />
                            </div>
                            <div className="pt-10">
                                <p
                                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                    id="communities-headline"
                                >
                                    My communities
                                </p>
                                <div className="mt-3 space-y-2" aria-labelledby="communities-headline">
                                    {communities.map((community) => (
                                        <a
                                            key={community.name}
                                            href={community.href}
                                            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                        >
                                            <span className="truncate">{community.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>
                    <main className="lg:col-span-9 xl:col-span-9">


                        <TabsUnstyled defaultValue={0}>
                            <TabsList>
                                <Tab
                                    onClick={() => setSort('')}
                                >Recent</Tab>
                                <Tab
                                    onClick={() => setSort('download_count')}
                                >Most Liked</Tab>
                                <Tab
                                    onClick={() => setSort('rating')}
                                >Most Rated</Tab>
                            </TabsList>
                        </TabsUnstyled>
                        <div className="mt-4">
                            <h1 className="sr-only">Recent Movies</h1>
                            <ListLoading isLoading={appState.loading} movies={appState.movies}/>
                        </div>
                    </main>
                </div>
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
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page + 1)}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Home;
