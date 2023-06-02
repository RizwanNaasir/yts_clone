import React, {useEffect} from 'react';
import {Popover} from '@headlessui/react'
import '../App.css';
import List from './List';
import withListLoading from '../components/WithListLoading';
import API from "../components/API";
import {genres_list, order, quality_list, rating_list, SelectType, sort_by_list,} from '../components/filterLists'
import NavBar from "../components/NavBar";
import DynamicSelects, {CustomOption} from "../components/ListCustomSelects";
import Tabs from "../components/Tabs";
import {usePersistedState} from "../hooks/use-persist-state";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function Home() {
    const defaultSelectType: SelectType = {
        name: 'All',
        value: '',
    }
    const ListLoading = withListLoading(List);
    const [appState, setAppState] = usePersistedState('appState', {
        loading: false,
        movies: null,
    });
    const [Limit, setLimit] = usePersistedState<number>('Limit', 9);
    const [Search, setSearch] = usePersistedState<string>('Search', '');
    const [Sort, setSort] = usePersistedState<SelectType>('Sort', defaultSelectType);
    const [Order, setOrder] = usePersistedState<SelectType>('Order', {name: 'Descending', value: 'desc'});
    const [Genre, setGenre] = usePersistedState<SelectType>('Genre', defaultSelectType);
    const [Quality, setQuality] = usePersistedState<SelectType>('Quality', defaultSelectType);
    const [Rating, setRating] = usePersistedState<SelectType>('Rating', defaultSelectType);
    const [page, setPage] = usePersistedState<number>('page', 1);
    const [totalMovies, setTotalMovies] = usePersistedState<number>('totalMovies', 0);

    const customSelectOptions: CustomOption[] = [
        {options: sort_by_list, label: 'Sort By', value: Sort, setValue: setSort},
        {options: genres_list, label: 'Genre', value: Genre, setValue: setGenre},
        {options: quality_list, label: 'Quality', value: Quality, setValue: setQuality},
        {options: rating_list, label: 'Rating', value: Rating, setValue: setRating},
        {options: order, label: 'Order', value: Order, setValue: setOrder},
    ]

    function movieList() {
        setAppState({movies: null, loading: true});
        const apiUrl = `list_movies.json`;
        const params: Record<string, any> = {
            query_term: Search,
            limit: Limit,
            page: page,
            sort_by: Sort.value,
            order_by: Order.value,
            genre: Genre.value,
            quality: Quality.value,
            minimum_rating: Rating.value,
        }
        fetch(`${API.endpoint}${apiUrl}?${new URLSearchParams(params)}`)
            .then((response) => response.json())
            .then((data) => {
                setLimit(data.data.limit);
                setTotalMovies(data.data.movie_count);
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
    }, [page, Search, Limit, Sort, Order, Genre.value, Quality, Rating, setAppState, setPage]);
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
                        <NavBar value={Search}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                open={open}
                                onClick={() => {
                                }}/>

                        <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                                <DynamicSelects options={customSelectOptions}/>
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
                                <DynamicSelects options={customSelectOptions}/>
                            </div>
                        </nav>
                    </div>
                    <main className="lg:col-span-9 xl:col-span-9">
                        <Tabs setSort={setSort}/>
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
                        Page <span className="font-medium">{page}</span> of <span
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
