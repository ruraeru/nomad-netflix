import { useQuery } from "react-query"
import { getNowPlaying, IGetMoviesResult } from "../api"
import MovieCards from "../components/MovieCards";

export default function NowPlaying() {
    const { isLoading, data } = useQuery<IGetMoviesResult>("now-playing", getNowPlaying);
    return (
        <>
            {!isLoading && <MovieCards movies={data} />}
        </>
    )
}