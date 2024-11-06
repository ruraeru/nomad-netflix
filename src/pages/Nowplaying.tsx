import { useQuery } from "react-query"
import { IMovie } from "../interface/IMovie"
import { getNowPlaying } from "../api"
import MovieCards from "../components/MovieCards";

export default function NowPlaying() {
    const { isLoading, data } = useQuery<IMovie[]>("now-playing", getNowPlaying);
    return (
        <>
            {!isLoading && <MovieCards movies={data} />}
        </>
    )
}