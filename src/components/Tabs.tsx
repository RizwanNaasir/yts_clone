import React, {useState} from 'react'
import {Tab} from '@headlessui/react'
import {SelectType} from "./filterLists";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

type TabsProps = {
    setSort: (value: SelectType) => void
}

export const Tabs: React.FC<TabsProps> = (props) => {
    let [categories] = useState<SelectType[]>([
        {name: 'All', value: ''},
        {name: 'Most Popular', value: 'download_count'},
        {name: 'Most Liked', value: 'like_count'},
    ])

    return (
        <div className="w-full px-2 sm:px-0">
            <Tab.Group onChange={(val) => props.setSort(categories[val])}>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {categories.map((category, index) => (
                        <Tab
                            key={index}
                            className={({selected}) =>
                                classNames(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {category.name}
                        </Tab>
                    ))}
                </Tab.List>
            </Tab.Group>
        </div>
    )
}

export default Tabs;
