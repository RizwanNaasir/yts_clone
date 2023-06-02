import React, {useEffect, useState} from 'react';
import WithListLoading from '../components/WithListLoading';
import Page from "./DetailPage";
import API from '../components/API';
import {useParams} from "react-router-dom";

const Details = () => {
    let locationParam = useParams();
    const ListLoading = WithListLoading(Page);
    const [appState, setAppState] = useState({
        loading: false,
        movie: null,
    });
    function movieList() {
        setAppState({movie: null, loading: true});
        const apiUrl = `movie_details.json`;
        const params: Record<string, any> = {
            movie_id: locationParam?.id,
            with_cast: true,
            with_images: true,
        }
        fetch(`${API.endpoint}${apiUrl}?${new URLSearchParams(params)}`)
            .then((response) => response.json())
            .then((data) => {
                    setAppState({
                        loading: false,
                        movie: data.data.movie,
                    });
                }
            );
    }

    useEffect(() => {
        movieList()
    }, [ setAppState ]);
    return (
        <ListLoading isLoading={appState.loading} movie={appState.movie}/>
    );
};
export  default Details;
