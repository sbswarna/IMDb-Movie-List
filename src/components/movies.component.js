import React, { useEffect, useState } from "react";
import _ from "lodash";

import Table from "./common/table.component";
import Rating from "./rating.component";
import getMovies from "../service/get-movies.service";
import getGenres from "../service/get-genres.service";
import Pagination from "./common/pagination.component";
import Filter from "./common/filtering.component";

const Movies = (props) => {
    const initialState = {
        movies: [],
        sortColumn: { path: "id", order: "asc" },
        activePage: 1,
        pageCount: 5,
        genres: [],
        selectedGenre: "All Genres",
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        const movies = getMovies();
        const genres = ["All Genres", ...getGenres()];
        setState((prev) => ({ ...prev, movies, genres }));
    }, []);

    function changeState(fieldName, updatedState) {
        setState((prev) => ({ ...prev, [fieldName]: updatedState }));
    }

    function handleToggleRating(movieRank) {
        const movies = [...state.movies];
        const movie = movies.find((movie) => movie.id === movieRank);
        movie.your_rating = !movie.your_rating;
        changeState("movies", movies);
    }

    function handleSort(sortColumn) {
        changeState("sortColumn", sortColumn);
    }

    function handleClickPage(activePage) {
        changeState("activePage", activePage);
    }

    function handleClickFilter(selectedGenre) {
        changeState("selectedGenre", selectedGenre);
    }

    function paginateMovies(movies) {
        const { activePage, pageCount } = state;
        const start = (activePage - 1) * pageCount;
        const paginatedMovies = movies.slice(start, start + pageCount);
        return paginatedMovies;
    }

    function filterMovies() {
        const { movies, selectedGenre } = state;
        const filteredMovies = movies.filter((movie) => {
            if (selectedGenre === "All Genres") return true;

            if (movie.genres.includes(selectedGenre)) return true;
            return false;
        });
        return filteredMovies;
    }

    function sortMovies(movies) {
        const { sortColumn } = state;
        const sortedMovies = _.orderBy(
            movies,
            [sortColumn.path],
            [sortColumn.order]
        );
        return sortedMovies;
    }

    const filteredMovies = filterMovies();
    const paginatedMovies = paginateMovies(filteredMovies);
    const movies = sortMovies(paginatedMovies);

    const columns = [
        {
            label: "Rank",
            path: "id",
            sorting: true,
            content: (movie, key) => <td>{movie[key]}</td>,
        },
        {
            label: "Title",
            path: "title",
            sorting: true,
            content: (movie, key) => <td>{movie[key]}</td>,
        },
        {
            label: "Poster",
            path: "posterUrl",
            content: (movie, key) => (
                <td>
                    <img
                        src={movie[key]}
                        style={{ height: "100px", width: "auto" }}
                    />
                </td>
            ),
        },
        {
            label: "Your Rating",
            path: "your_rating",
            content: (movie, key) => (
                <td>
                    <Rating
                        isRated={movie[key]}
                        rank={movie.id}
                        handleToggleRating={handleToggleRating}
                    />
                </td>
            ),
        },
        {
            label: "Action",
            path: "action",
            content: (movie, key) => <td>{movie[key]}</td>,
        },
    ];

    return (
        <>
            <div className="container">
                <div className="row">
                    <Filter
                        items={state.genres}
                        selectedGenre={state.selectedGenre}
                        onClickFilter={handleClickFilter}
                    />
                    <div className="col-lg-8">
                        <Table
                            items={movies}
                            columns={columns}
                            onSort={handleSort}
                            sortColumn={state.sortColumn}
                        />
                        <Pagination
                            totalItems={filteredMovies.length}
                            pageCount={state.pageCount}
                            activePage={state.activePage}
                            onClickPage={handleClickPage}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movies;
