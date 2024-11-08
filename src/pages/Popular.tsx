import { useQuery } from "react-query";
import MovieCards from "../components/MovieCards";
import { getPopular, IGetMoviesResult } from "../api";

export default function Popular() {
    const { isLoading, data: movies } = useQuery<IGetMoviesResult>('popular', getPopular);
    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return <MovieCards movies={movies} />
}