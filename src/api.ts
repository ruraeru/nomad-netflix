const API_KEY = "04814f918edf08893f369f7745d159f8";
const BASE_URL = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
  title: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IMovieDetail {
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

export function getPopular() {
  return fetch(
    `${BASE_URL}/movie/popular?language=ko-KO&api_key=${API_KEY}`
  ).then((r) => r.json());
}

export function getNowPlaying() {
  return fetch(
    `${BASE_URL}/movie/now_playing?language=ko-KO&api_key=${API_KEY}`
  ).then((res) => res.json());
}

export function getComingSoon() {
  return fetch(
    `${BASE_URL}/movie/upcoming?language=ko-KO&api_key=${API_KEY}`
  ).then((r) => r.json());
}

export function getMovieDetail(id: string | null) {
  if (id === null || id === "") return null;
  return fetch(
    `${BASE_URL}/movie/${id}?language=ko-KO&api_key=${API_KEY}`
  ).then((r) => r.json());
}

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
