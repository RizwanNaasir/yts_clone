import {FilmIcon} from "@heroicons/react/solid";
import React from "react";

export const NotFound = () => {
    return (
        <div className="px-6 py-14 text-center text-sm sm:px-14">
            <FilmIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true"/>
            <p className="mt-4 font-semibold text-gray-900">Oops! No results.</p>
            <p className="mt-2 text-gray-500">
                We couldn’t find anything with that term. Please try again.
            </p>
        </div>
    )
}

export default NotFound;