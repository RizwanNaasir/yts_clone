import React, {useEffect, useState} from 'react';
import {Popover} from '@headlessui/react'
import '../App.css';
import List from './List';
import withListLoading from '../components/WithListLoading';
import API from "../components/API";
import {
    communities,
    genres_list,
    quality_list,
    rating_list,
    sort_by_list,
    Tab,
    TabsList,
} from '../components/filterLists'
import TabsUnstyled from '@mui/base/TabsUnstyled';
import SelectSmall from "../components/MenuLists";
import Nav from "../components/layouts/nav";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Home() {

    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
        loading: false,
        movies: null,
    });
    const [Limit, setLimit] = useState(9);
    const [Search, setSearch] = useState('');
    const [Sort, setSort] = useState('');
    const [Order] = useState('');
    const [Genre, setGenre] = useState('');
    const [Quality, setQuality] = useState('');
    const [Rating, setRating] = useState('');
    let [page, setPage] = useState(1);
    const [totalMovies, settTotalMovies] = useState(0);

    function movieList() {
        setAppState({movies: null, loading: true});
        const apiUrl = `list_movies.json`;
        const params: Record<string, any> = {
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
                        <Nav value={Search}
                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                             open={open}
                             onClick={() => {
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
