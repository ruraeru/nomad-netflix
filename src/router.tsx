import App from './App';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: 'coming-soon',
                element: <div>Coming soon</div>,
            },
            {
                path: 'now-playing',
                element: <div>Now playing</div>,
            },
        ],
    },
]);
