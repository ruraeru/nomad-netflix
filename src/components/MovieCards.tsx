import { motion } from "framer-motion";
import styled from "styled-components";
import { IMovie, makeImagePath } from "../api";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { keywordState } from "../atom";
import MovieCard from "./MovieCard";
import Loading from "./Loading";

const movieWrapperVariants = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.1,
      bounce: 0.5,
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const movieVariants = {
  start: { opacity: 0, y: 10, scale: 0.1 },
  end: { opacity: 1, y: 0, scale: 1 }
};

export default function MovieCards({ movies }: { movies: IMovie[] }) {
  const [movieId, setMovieId] = useState<string | null>(null);
  const searchKeyword = useRecoilValue(keywordState);

  const closeModal = () => setMovieId(null);
  const filterMovies = searchKeyword !== "" ? movies?.filter(movie => movie.title.toUpperCase().includes(searchKeyword.toUpperCase())) : movies.slice(1);
  const bannerMovie = filterMovies[0];

  useEffect(() => {
    if (movieId) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    }
  }, [movieId]);

  if (filterMovies.length === 0) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "64px"
      }}>
        검색 결과가 없습니다!
      </div>
    )
  }

  return (
    <>
      <Banner
        layoutId={bannerMovie.backdrop_path}
        $bgPhoto={makeImagePath(bannerMovie.backdrop_path)}
      >
        <Title>{bannerMovie.title}</Title>
        <Overview>{bannerMovie.overview.slice(0, 150)}...</Overview>
        <MoreInfoBtn
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255, 255, 255, 1)"
          }}
          transition={{
            type: "tween",
            duration: 0.5
          }}
          onClick={() => setMovieId(bannerMovie.id + "")}
        >
          <svg data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
          </svg>
          자세히 보기
        </MoreInfoBtn>
      </Banner>
      <Wrapper variants={movieWrapperVariants} initial="start" animate="end">
        {filterMovies?.map((movie) => (
          <motion.div
            layoutId={movie.id + ""}
            key={movie.id}
            variants={movieVariants}
            onClick={() => setMovieId(movie.id + "")}
          >
            <PosterImg
              whileHover={{ y: -20, scale: 1.1 }}
              src={makeImagePath(movie.poster_path, "w500")}
              alt={movie.title}
            />
            <h1>{movie.title}</h1>
          </motion.div>
        ))}
        <MovieCard closeModal={closeModal} movieId={movieId} />
      </Wrapper>
    </>
  )
}

const Banner = styled(motion.div) <{ $bgPhoto: string }>`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 68px;
  font-weight: bold;
  margin-bottom: 20px; ;

  @media (max-width: 768px) {
    font-size: 34px;
  }
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const MoreInfoBtn = styled(motion.button)`
  width: 250px;
  height: 80px;
  border-radius: 125px;
  font-size: 32px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  svg {
    width: 40px;
    margin-right: 5px;
  }
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
`;


const Wrapper = styled(motion.div)`
  position: relative;
  top: -300px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 50px;
  text-align: center;
  
  margin-top: 50px;
  padding: 50px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const PosterImg = styled(motion.img)`
  width: 100%;
  border-radius: 15px;
  cursor: pointer;
`;