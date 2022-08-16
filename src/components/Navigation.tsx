import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: ${(props) => props.theme.coinBgColor};
  padding: 16px;
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
  }
`;

const Tab = styled.li<{ isActive: boolean }>`
  margin-right: 20px;
  a {
    text-decoration: none;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    font-size: 24px;
    font-weight: 400;
    transition: all 0.5s ease-in-out;
    text-transform: uppercase;
  }
`;

export default function Navigation() {
  const coinsMatch = useMatch("/");
  const toDosMatch = useMatch("/todos");
  return (
    <Nav>
      <ul>
        <Tab isActive={coinsMatch !== null}>
          <Link to="/">Crypto Tracker</Link>
        </Tab>
        <Tab isActive={toDosMatch !== null}>
          <Link to="/todos">To Do List</Link>
        </Tab>
      </ul>
    </Nav>
  );
}
