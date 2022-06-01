import React, {useEffect, useState} from 'react';
import List from './List';
import withListLoading from '../components/withListLoading';
import Page from "./detailPage";
import API from '../components/API';

const Details = (props) => {
    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
        loading: false,
        movie: null,
    });
    function movieList() {
        setAppState({loading: true});
        const apiUrl = `movie_details.json`;
        const params = {
            movie_id: props.match.params.id,
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
    }, [ setAppState]);
    return (
        <Page isLoading={appState.loading} movie={appState.movie}/>
    );
};
export  default Details;
