import React, {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpIcon} from '@heroicons/react/solid'
import {SelectType} from "./filterLists";

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

type props = {
    options: SelectType[]
    label: string
    value: SelectType
    setValue: (value: SelectType) => void
}

export const CustomSelect: React.FC<props> = (props) => {
    const options = props.options;
    return (
        <Listbox value={props.value} onChange={(value) => props.setValue(value)}>
            {({open}) => (
                <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                        {props.label}
                    </Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{props.value.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option, index) => (
                                    <Listbox.Option
                                        key={index}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={option}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <span
                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                  {option.name}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                                  </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

export default CustomSelect
