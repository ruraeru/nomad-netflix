import { useQuery } from "react-query";
import MovieCards from "../components/MovieCards";
import { getComingSoon } from "../api";
import Loading from "../components/Loading";

export default function ComingSoon() {
    const { isLoading, data } = useQuery("comingsoon", getComingSoon);
    if (isLoading) {
        return <Loading />
    }
    return <MovieCards movies={data} />
}