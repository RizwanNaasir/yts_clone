import React, {useEffect, useState, Fragment} from 'react';
import {Menu, Popover, Transition, Listbox} from '@headlessui/react'
import '../App.css';
import List from './List';
import withListLoading from '../components/WithListLoading';
import API from "../components/API";
import {genres_list, sort_by_list, rating_list, quality_list, communities, TabsList, Tab, order } from '../components/filterLists'
import {SearchIcon,} from '@heroicons/react/solid'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import TabsUnstyled from '@mui/base/TabsUnstyled';
import SelectSmall from "../components/MenuLists";
import {useAuthState} from "react-firebase-hooks/auth";
import {Link} from "react-router-dom";
import {auth, logout} from "../firebase";
import CustomSelect from "../components/CustomSelect";
import * as PropTypes from "prop-types";
import Nav from "../components/layouts/nav";


const userNavigation = [
    {name: 'Your Profile', href: '#'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}




// Nav.propTypes = {
//     value: PropTypes.string,
//     onChange: PropTypes.func,
//     open: PropTypes.bool,
//     user: PropTypes.any,
//     callbackfn: PropTypes.func,
//     onClick: PropTypes.func
// };

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

        <div className="min-h-full z-0">
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
                        <Nav value={Search} onChange={(e) => setSearch(e.target.value)} open={open} user={user}
                             callbackfn={(item) => (
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
                             )} onClick={() => {
                            logout()
                        }}/>

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
                                                    <img className="h-10 w-10 rounded-full" src={user?.photoURL}
                                                         alt=""/>
                                                </div>
                                                <div className="ml-3">
                                                    <div
                                                        className="text-base font-medium text-gray-800">{user?.displayName}</div>
                                                    <div
                                                        className="text-sm font-medium text-gray-500">{user?.email}</div>
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
                                            <button onClick={() => {
                                                logout()
                                            }}
                                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700">
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
                                            <Link to="/register"
                                                  className="text-base font-medium text-gray-900 hover:underline">
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
                            <p
                                className="p-3 text-xs text-center font-semibold text-gray-500 uppercase tracking-wider"
                            >
                                Filters
                            </p>
                            <div className="py-8 space-y-3">
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
                            {/*<div className="flex justify-end">*/}
                            {/*<CustomSelect*/}
                            {/*    onChange={setOrder}*/}
                            {/*    value={Order}*/}
                            {/*    label="Order"*/}
                            {/*    list={order}*/}
                            {/*/></div>*/}
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
