import React from 'react';
import {
    ArrowNarrowLeftIcon,
    CheckIcon,
    HomeIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    ThumbUpIcon,
    UserIcon,
} from '@heroicons/react/solid'

const comments = [
    {
        id: 1,
        name: 'Leslie Alexander',
        date: '4d ago',
        imageId: '1494790108377-be9c29b29330',
        body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
    },
    {
        id: 2,
        name: 'Michael Foster',
        date: '4d ago',
        imageId: '1519244703995-f4e0f30006d5',
        body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
    },
    {
        id: 3,
        name: 'Dries Vincent',
        date: '4d ago',
        imageId: '1506794778202-cad84cf45f1d',
        body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
    },
]

const detailPage = (props) => {
    const {movie} = props;
    if (!movie || movie.length === 0)
        return <withListLoading/>
            ;
    return (
        <div className="min-h-full">
            <main className="py-10">
                {/* Page header */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center space-x-5">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">{movie.title}</h1>
                            <p className="text-gray-500 my-2 font-bold text-black">{movie.year}</p>
                            {movie.genres.map((genre) => (
                                <span className="inline-flex items-center px-2.5 mr-2 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col-row justify-stretch space-x-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        {movie.torrents.map((item) => (
                            <a
                                href={`magnet:?xt=urn:btih:${movie.hash}&dn=${movie.title}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`}
                            >
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                >
                                    {item.quality}
                                </button>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-3 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
                        <div className="bg-white p-2 shadow sm:rounded-lg sm:px-6">
                            <div className="my-6 flow-root">
                                <img
                                    className="h-full w-full rounded-lg"
                                    src={movie.large_cover_image}
                                    alt=""
                                />
                            </div>
                        </div>
                    </section>
                    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                        {/* Description list*/}
                        <section aria-labelledby="applicant-information-title">
                            <div className="bg-white shadow sm:rounded-lg">
                                <div className="px-4 py-5 sm:px-6 relative">
                                    <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                                        Title Information
                                    </h2>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Movie Details</p>
                                    <span className="inline-flex items-center absolute  top-3 right-3 px-5 py-2 rounded-md text-md font-medium bg-yellow-200 text-yellow-800">
                                        {movie.rating} / 10
                                      </span>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Application for</dt>
                                            <dd className="mt-1 text-sm text-gray-900">Backend Developer</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                            <dd className="mt-1 text-sm text-gray-900">ricardocooper@example.com</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                                            <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                            <dd className="mt-1 text-sm text-gray-900">+1 555-555-5555</dd>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <dt className="text-sm font-medium text-gray-500">Summary</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {movie.description_full}
                                            </dd>
                                        </div>
                                        <div className="sm:col-span-2 rounded-2xl">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={'//www.youtube.com/embed/'+ movie.yt_trailer_code}
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </dl>
                                    <div
                                        className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                                        <ul className="flex flex-wrap -mb-px">
                                            {movie.torrents.map((item) => (
                                            <li className="mr-2">
                                                <a href="#"
                                                   className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                                                    {item.quality}</a>
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section aria-labelledby="notes-title">
                            <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                <div className="divide-y divide-gray-200">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                                            Cast
                                        </h2>
                                    </div>
                                    <div className="px-4 py-6 sm:px-6">
                                        <ul
                                            role="list"
                                            className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
                                        >
                                            {movie.cast.map((person) => (
                                                 <li key={person.imdb_code}>
                                                    <div className="space-y-4">
                                                        <img className="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src={person.url_small_image} alt="" />
                                                        <div className="space-y-2">
                                                            <div className="text-xs font-medium lg:text-sm">
                                                                <h3>{person.name}</h3>
                                                                <p className="text-indigo-600">{person.character_name}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section aria-labelledby="cast">
                            <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                                <div className="divide-y divide-gray-200">
                                    <div className="px-4 py-5 sm:px-6">
                                        <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                                            Comments
                                        </h2>
                                    </div>
                                    <div className="px-4 py-6 sm:px-6">
                                        <ul role="list" className="space-y-8">
                                            {comments.map((comment) => (
                                                <li key={comment.id}>
                                                    <div className="flex space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="h-10 w-10 rounded-full"
                                                                src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm">
                                                                <a href="#" className="font-medium text-gray-900">
                                                                    {comment.name}
                                                                </a>
                                                            </div>
                                                            <div className="mt-1 text-sm text-gray-700">
                                                                <p>{comment.body}</p>
                                                            </div>
                                                            <div className="mt-2 text-sm space-x-2">
                                                                <span className="text-gray-500 font-medium">{comment.date}</span>{' '}
                                                                <span className="text-gray-500 font-medium">&middot;</span>{' '}
                                                                <button type="button" className="text-gray-900 font-medium">
                                                                    Reply
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-6 sm:px-6">
                                    <div className="flex space-x-3">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src="" alt="" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <form action="#">
                                                <div>
                                                    <label htmlFor="comment" className="sr-only">
                                                        About
                                                    </label>
                                                    <textarea
                                                        id="comment"
                                                        name="comment"
                                                        rows={3}
                                                        className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md"
                                                        placeholder="Add a note"
                                                        defaultValue={''}
                                                    />
                                                </div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <a
                                                        href="#"
                                                        className="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900"
                                                    >
                                                        <QuestionMarkCircleIcon
                                                            className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <span>Some HTML is okay.</span>
                                                    </a>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        Comment
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>


                </div>
            </main>
        </div>
    )
}
export default detailPage;
