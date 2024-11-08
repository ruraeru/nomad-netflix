import { useQuery } from "react-query";
import MovieCards from "../components/MovieCards";
import { getComingSoon, IGetMoviesResult } from "../api";

export default function ComingSoon() {
    const { isLoading, data } = useQuery<IGetMoviesResult>("comingsoon", getComingSoon);
    return (
        <>
            {!isLoading && <MovieCards movies={data} />}
        </>
    )
}