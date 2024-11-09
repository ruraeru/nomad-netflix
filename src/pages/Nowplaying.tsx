import { useQuery } from "react-query"
import { IMovie } from "../interface/IMovie"
import { getNowPlaying } from "../api"
import MovieCards from "../components/MovieCards";
import Loading from "../components/Loading";

export default function NowPlaying() {
    const { isLoading, data } = useQuery<IMovie[]>("now-playing", getNowPlaying);
    if (isLoading) {
        return <Loading />
    }
    return <MovieCards movies={data} />
}