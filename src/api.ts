const BASE_URL = process.env.REACT_APP_API_KEY;

export function getPopular() {
  return fetch(`${BASE_URL}/popular`)
    .then((r) => r.json())
    .then((data) => data.results);
}

export function getNowPlaying() {
  return fetch(`${BASE_URL}/now-playing`).then((r) => r.json());
}

export function getComingSoon() {
  return fetch(`${BASE_URL}/coming-soon`).then((r) => r.json());
}

export function getMovie(id: string | null) {
  console.log(`${BASE_URL}/movie?id=${id}`);
  return fetch(`${BASE_URL}/movie?id=${id}`).then((r) => r.json());
}

export function makeImagePath(image: string) {
  return `https://image.tmdb.org/t/p/w500${image}`;
}

export function makeBgPath(image: string) {
  return `https://image.tmdb.org/t/p/original${image}`;
}
