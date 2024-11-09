const BASE_URL = "https://movies-api.nomadcoders.workers.dev";

export function getPopular() {
  return fetch(`${BASE_URL}/popular`)
    .then((r) => r.json())
    .then((json) => json.results);
}

export function getNowPlaying() {
  return fetch(`${BASE_URL}/now-playing`)
    .then((r) => r.json())
    .then((json) => json.results);
}

export function getComingSoon() {
  return fetch(`${BASE_URL}/coming-soon`)
    .then((r) => r.json())
    .then((json) => json.results);
}

export function getMovie(id: string | null) {
  return fetch(`${BASE_URL}/movie?id=${id}`).then((r) => r.json());
}

export function makeImagePath(image: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${image}`;
}

export interface IMovie {
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
