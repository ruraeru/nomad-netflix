import { useQuery } from "react-query";
import MovieCards from "../components/MovieCards";
import { IMovie } from "../interface/IMovie";
import { getPopular } from "../api";

export default function Popular() {
    const { isLoading, data: movies } = useQuery<IMovie[]>('popular', getPopular);
    if (!isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return <MovieCards movies={movies} />
}