import { useQuery } from "react-query";
import MovieCards from "../components/MovieCards";
import { IMovie } from "../interface/IMovie";
import { getPopular } from "../api";
import Loading from "../components/Loading";

export default function Popular() {
    const { isLoading, data: movies } = useQuery<IMovie[]>('popular', getPopular);
    console.log(movies);
    if (isLoading) {
        return <Loading />
    }
    return <MovieCards movies={movies} />
}