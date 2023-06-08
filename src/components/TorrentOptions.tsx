import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {TorrentsEntity} from "../types/Movie";

type Props = {
    options: TorrentsEntity[] | null | undefined
    movieTitle: string
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TorrentOptions(props: Props) {
    const {options} = props;
    return (
        <div className="inline-flex rounded-md shadow-sm">
            <Menu as="div" className="relative -ml-px block">
                <Menu.Button
                    className="relative inline-flex items-center rounded-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                    <span className="sr-only">Get Now!</span>
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true"/>
                </Menu.Button>
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
                        className="absolute right-0 z-10 -mr-1 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {options && options?.length > 0
                                ?
                                options.map((item, index) => (
                                    <Menu.Item key={index}>
                                        {({active}) => (
                                            <a
                                                target="_blank"
                                                href={`magnet:?xt=urn:btih:${item.hash}&dn=${props.movieTitle}&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://p4p.arenabg.ch:1337&tr=udp://tracker.internetwarriors.net:1337`}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                {item.quality}
                                                <span
                                                    className="inline-flex items-center rounded-md bg-green-100 m-1 px-1.5 py-0.5 text-xs font-medium text-green-700  ring-1 ring-inset ring-blue-700/10">
                                                    {item.size}
                                                </span>
                                                <span
                                                    className="inline-flex items-center rounded-md bg-blue-100 m-1 px-1.5 py-0.5 text-xs font-medium text-blue-700  ring-1 ring-inset ring-blue-700/10">
                                                    {item.type}
                                                </span>
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))
                                :
                                <Menu.Item>
                                    {({active}) => (
                                        <a
                                            href={`#`}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            No Torrents Available
                                        </a>
                                    )}
                                </Menu.Item>
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
