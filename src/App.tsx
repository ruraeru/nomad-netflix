import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import { getMovie, getPopular, makeImagePath } from './api';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface IPopular {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: object;
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: object;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: object;
  production_countries: object;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: object;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled(motion.div)`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
  text-align: center;
  padding: 50px;
`;

const PosterImg = styled(motion.img)`
  width: 100%;
  border-radius: 15px;
`;

const Header = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  width: 50%;
  margin: 0 auto;
  height: 50px;
  /* margin-top: 50px; */
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
  /* gap: 10px; */
  li {
    p {
      font-size: 20px;
      color: red;
      font-weight: 700;
    }
  }
`;

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

export default function App() {
  const { isLoading, data: movies } = useQuery<IPopular[]>('popular', getPopular);
  const [movieId, setMovieId] = useState<string | null>(null);
  const { isLoading: movieLoading, data: movieDetail } = useQuery<IMovieDetail>(
    ["movie", movieId],
    () => getMovie(movieId),
  );
  return (
    <Container>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Header>
            <li>
              <Link to="/">popular</Link>
            </li>
            <li>
              <Link to="/coming-soon">coming soon</Link>
            </li>
            <li>
              <Link to="/now-playing">now playing</Link>
            </li>
          </Header>
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
        </>
      )
      }
    </Container >
  );
}

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
  width: 100%;
  height: 60%;
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
  height: 100%;
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