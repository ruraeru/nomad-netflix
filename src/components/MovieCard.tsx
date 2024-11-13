import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { memo } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { getMovie, IMovieDetail, makeImagePath } from "../api";

interface MovieCardProps {
  closeModal: () => void;
  movieId: string | null;
}

const MovieCard = memo(({ closeModal, movieId }: MovieCardProps) => {
  const { isLoading, data: movieDetail } = useQuery<IMovieDetail>(
    {
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId),
      enabled: movieId !== null && true
    }
  );

  if (!movieId) return null;

  return (
    <AnimatePresence>
      <Overlay
        onClick={closeModal}
        layoutId={movieId}
        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      >
        <Container onClick={(e) => e.stopPropagation()}>
          <CloseButton
            onClick={closeModal}
            data-slot="icon"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
            />
          </CloseButton>

          {isLoading ? (
            <Loading />
          ) : (
            movieDetail && (
              <>
                <CoverImage>
                  <img
                    src={makeImagePath(movieDetail.backdrop_path)}
                    alt={movieDetail.title}
                  />
                  <Gradient />
                </CoverImage>
                <ContentSection>
                  <MovieTitle>
                    <a href={movieDetail.homepage}>{movieDetail.title}</a>
                  </MovieTitle>
                  <MovieOverview>{movieDetail.overview}</MovieOverview>
                  <MovieDetails>
                    <DetailItem>
                      <Label>Budget</Label>
                      <Value>${movieDetail.budget.toLocaleString()}</Value>
                    </DetailItem>
                    <DetailItem>
                      <Label>Revenue</Label>
                      <Value>${movieDetail.revenue.toLocaleString()}</Value>
                    </DetailItem>
                    <DetailItem>
                      <Label>Runtime</Label>
                      <Value>{movieDetail.runtime} minutes</Value>
                    </DetailItem>
                    <DetailItem>
                      <Label>Rating</Label>
                      <Value>{movieDetail.vote_average.toFixed(1)}</Value>
                    </DetailItem>
                    {movieDetail.homepage && (
                      <DetailItem>
                        <ExternalLink href={movieDetail.homepage}>
                          Visit Homepage
                        </ExternalLink>
                      </DetailItem>
                    )}
                  </MovieDetails>
                </ContentSection>
              </>
            )
          )}
        </Container>
      </Overlay>
    </AnimatePresence>
  );
});

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 50;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 48rem;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0.95),
    rgba(10, 10, 10, 0.98)
  );
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 640px) {
    max-height: 90vh;
    overflow-y: auto;
  }
`;

const CloseButton = styled.svg`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  color: #666;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s;
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }
`;

const CoverImage = styled.div`
  position: relative;
  width: 100%;
  height: auto;

  img {
    width: 100%;
    max-height: 24rem;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(10, 10, 10, 0.8) 50%,
    rgba(10, 10, 10, 0.95)
  );
`;

const ContentSection = styled.div`
  padding: 1.5rem;
  position: relative;
  z-index: 1;
`;

const MovieTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 640px) {
    font-size: 1.875rem;
  }
`;

const MovieOverview = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #e0e0e0;
  margin-bottom: 1.5rem;
  text-align: left;

  @media (max-width: 640px) {
    font-size: 0.875rem;
  }
`;

const MovieDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 0.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: #a0a0a0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Value = styled.span`
  font-size: 0.875rem;
  color: white;
  font-weight: 600;
`;

const ExternalLink = styled.a`
  display: inline-block;
  color: #60a5fa;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #93c5fd;
    text-decoration: underline;
  }
`;

export default MovieCard;