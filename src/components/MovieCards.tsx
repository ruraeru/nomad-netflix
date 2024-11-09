import { motion } from "framer-motion";
import styled from "styled-components";
import { IMovie, makeImagePath } from "../api";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { keywordState } from "../atom";
import MovieCard from "./MovieCard";

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
  const filterMovies = searchKeyword !== "" ? movies?.filter(movie => movie.title.toUpperCase().includes(searchKeyword.toUpperCase())) : movies;

  return (
    <>
      <Banner $bgPhoto={makeImagePath(movies[10].backdrop_path)}>
        <Title>{movies[0].title}</Title>
        <Overview>{movies[0].overview.slice(0, 150)}...</Overview>
        <MoreInfoBtn onClick={() => setMovieId(movies[10].id + "")}>
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

const Banner = styled.div<{ $bgPhoto: string }>`
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

const MoreInfoBtn = styled.button`
  width: 250px;
  height: 80px;
  border-radius: 125px;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  svg {
    width: 40px;
    margin-right: 5px;
  }
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