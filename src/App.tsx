import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Header = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;

  width: 50%;
  margin: 0 auto;
  height: 50px;
  margin-top: 50px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
  li {
    p {
      font-size: 20px;
      color: red;
      font-weight: 700;
    }
  }
`;



export default function App() {

  return (
    <Container>
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
      <Outlet />
    </Container >
  );
}
