import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #0a0c13;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  
  img {
    height: 40px;
    margin-right: 10px;
  }
`;

const Nav = styled.nav`
  margin-left: auto;
  
  ul {
    display: flex;
    list-style: none;
  }
  
  li {
    margin-left: 20px;
  }
  
  a {
    color: white;
    text-decoration: none;
    
    &:hover {
      color: #3498db;
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
      
      </Link>
      
 
    </HeaderContainer>
  );
}

export default Header; 