import App from './App';
import { createBrowserRouter } from 'react-router-dom';
import ComingSoon from './pages/Comingsoon';
import Popular from './pages/Popular';
import NowPlaying from './pages/Nowplaying';

export const router = createBrowserRouter([
    {
        path: '/nomad-nextflix',
        element: <App />,
        children: [
            {
                path: '/nomad-nextflix',
                element: <Popular />
            },
            {
                path: 'coming-soon',
                element: <ComingSoon />,
            },
            {
                path: 'now-playing',
                element: <NowPlaying />
            },
        ],
    },
]);
