import { useQuery } from "react-query";
import MovieCards from "../components/MovieCards";
import { getComingSoon } from "../api";

export default function ComingSoon() {
    const { isLoading, data } = useQuery("comingsoon", getComingSoon);
    console.log(data);
    return (
        <>
            {!isLoading && <MovieCards movies={data} />}
        </>
    )
}