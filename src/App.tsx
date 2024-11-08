import { Outlet } from 'react-router-dom';
import Search from './components/Search';
import Header from './components/Header';

export default function App() {
  return (
    <>
      <Header />
      <Search />
      <Outlet />
    </>
  )
}