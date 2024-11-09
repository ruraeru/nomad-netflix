import { useQuery } from "react-query"
import { getNowPlaying } from "../api"
import MovieCards from "../components/MovieCards";
import Loading from "../components/Loading";

export default function NowPlaying() {
    const { isLoading, data } = useQuery("now-playing", getNowPlaying);
    if (isLoading) {
        return <Loading />
    }
    return <MovieCards movies={data} />
}