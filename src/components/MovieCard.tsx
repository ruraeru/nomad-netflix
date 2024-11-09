import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Loading from "./Loading";
import { useQuery } from "react-query";
import { getMovie, IMovieDetail, makeImagePath } from "../api";

interface MovieCardProps {
  closeModal: () => void;
  movieId: string | null;
}

export default function MovieCard({ closeModal, movieId }: MovieCardProps) {
  const { isLoading: movieLoading, data: movieDetail } = useQuery<IMovieDetail>(
    ["movie", movieId],
    () => getMovie(movieId),
  );
  return (
    <AnimatePresence>
      {movieId && (
        <Overlay
          onClick={closeModal}
          layoutId={movieId}
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
          {movieLoading ? (
            <Loading />
          ) : (
            movieDetail && (
              <Card onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <CloseBtn onClick={closeModal} data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clipRule="evenodd" fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"></path>
                </CloseBtn>
                <ImgContainer>
                  <MovieImg
                    src={makeImagePath(movieDetail.poster_path)}
                    alt={movieDetail.title}
                  />
                </ImgContainer>
                <Content>
                  <Title><a href={movieDetail.homepage}>{movieDetail.title}</a></Title>
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
  )
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
  @media (max-width: 768px){
    display: flex;
    max-width: 1000px;
  }
  max-width: 600px;

  border-radius: 15px;
  overflow-y: scroll;
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
  border: 1px solid rgba(255, 255, 255, 0.1);
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
`;

const Content = styled.div`
  padding: 24px;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0 0 16px 0;
  text-decoration: underline;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  @media (max-width: 768px) {
    font-size: 14px;
  }
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 24px 0;
  color: #e0e0e0;  
`;

const MovieInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const InfoItem = styled.div`
  width: 100%;
  font-size: 14px;
  color: #b0b0b0;
  
  span {
    color: white;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;