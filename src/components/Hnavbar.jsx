import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Hnavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar>
      {/* Left side - Home */}
      <NavBrand onClick={() => navigate("/")}>MovieNest</NavBrand>

      {/* Right side - Navigation Buttons */}
      <ButtonGroup>
        <NavButton onClick={() => navigate("/")}>Home</NavButton>
        <NavButton onClick={() => navigate("/login")}>Login</NavButton>
        <NavButton onClick={() => navigate("/register")}>Register</NavButton>
      </ButtonGroup>
    </Navbar>
  );
};

export default Hnavbar;

// Styled Components (CSS inside the same file)
const Navbar = styled.nav`
  background: linear-gradient(to right, #2c3e50, #34495e);
  padding: 16px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: fixed; /* Makes the navbar stay at the top */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensures it stays above other elements */
`;

const NavBrand = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1abc9c;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const NavButton = styled.button`
  padding: 10px 16px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: white;
    color: #34495e;
  }
`;
