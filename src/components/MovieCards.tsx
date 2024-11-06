import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovie, makeImagePath } from "../api";
import { useState } from "react";
import { IMovie, IMovieDetail } from "../interface/IMovie";

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

export default function MovieCards({ movies }: { movies: IMovie[] | undefined }) {
  const [movieId, setMovieId] = useState<string | null>(null);
  const { isLoading: movieLoading, data: movieDetail } = useQuery<IMovieDetail>(
    ["movie", movieId],
    () => getMovie(movieId),
  );
  return (
    <Wrapper variants={movieWrapperVariants} initial="start" animate="end">
      {movies?.map((movie) => (
        <motion.div
          layoutId={movie.id + ""}
          key={movie.id}
          variants={movieVariants}
          onClick={() => setMovieId(movie.id + "")}
        >
          <PosterImg
            whileHover={{ y: -20, scale: 1.1 }}
            src={makeImagePath(movie.poster_path)}
            alt={movie.title}
          />
          <h1>{movie.title}</h1>
        </motion.div>
      ))}
      <AnimatePresence>
        {movieId && movieDetail && (
          <Overlay layoutId={movieId} initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
            {movieLoading ? (
              <div>Loading...</div>
            ) : (
              movieDetail && (
                <Card>
                  <CloseBtn onClick={() => setMovieId(null)} data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"></path>
                  </CloseBtn>
                  <ImgContainer>
                    <MovieImg
                      src={makeImagePath(movieDetail.poster_path)}
                      alt={movieDetail.title}
                    />
                  </ImgContainer>
                  <Content>
                    <Title>{movieDetail.title}</Title>
                    <Description>{movieDetail.overview}</Description>
                    <MovieInfoGrid>
                      <InfoItem>
                        Budget: <span>${movieDetail.budget.toLocaleString()}</span>
                      </InfoItem>
                      <InfoItem>
                        Revenue: <span>${movieDetail.revenue.toLocaleString()}</span>
                      </InfoItem>
                      <InfoItem>
                        Runtime: <span>{movieDetail.runtime} minutes</span>
                      </InfoItem>
                      <InfoItem>
                        Rating: <span>{movieDetail.vote_average.toFixed(1)}</span>
                      </InfoItem>
                      {movieDetail.homepage && (
                        <InfoItem>
                          <a href={movieDetail.homepage}>Homepage</a>
                        </InfoItem>
                      )}
                    </MovieInfoGrid>
                  </Content>
                </Card>
              )
            )}
          </Overlay>
        )}
      </AnimatePresence>
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
  text-align: center;
  
  margin-top: 50px;
  padding: 50px;
`;

const PosterImg = styled(motion.img)`
  width: 100%;
  border-radius: 15px;
  cursor: pointer;
`;

const Overlay = styled(motion.div)`
  position: fixed;  
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Card = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  border-radius: 8px;
  overflow-y: auto;
  position: relative;
  &:-webkit-scrollbar {
    display: none;
  }
  margin: 20px;
  background: 
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.8) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
  background-size: cover;
  background-position: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const CloseBtn = styled.svg`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  z-index: 10;
`

const ImgContainer = styled.div`
  /* width: 100%; */
  /* height: 10%; */
  object-fit: cover;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
  }
`;

const MovieImg = styled.img`
  width: 100%;
  height: min-content;
  object-fit: cover;
`

const Content = styled.div`
  padding: 24px;
  position: relative;
  z-index: 1;
`

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0 0 16px 0;
`

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 24px 0;
  color: #e0e0e0;  
`

const MovieInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`

const InfoItem = styled.div`
  width: 100%;
  font-size: 14px;
  color: #b0b0b0;
  
  span {
    color: white;
    font-weight: bold;
  }
`