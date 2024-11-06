import { useQuery } from "react-query";
import MovieCards from "../components/MovieCards";
import { IMovie } from "../interface/IMovie";
import { getPopular } from "../api";

export default function Popular() {
    const { isLoading, data: movies } = useQuery<IMovie[]>('popular', getPopular);
    return (
        <>
            {!isLoading && <MovieCards movies={movies} />}
        </>
    )
}