import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OwnerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Sidebar>
      <NavLogo>MOVIENEST</NavLogo>
      <NavLinks>
        <NavItem onClick={() => navigate("/OwnerDashboard")}>Owner Dashboard</NavItem>
        <NavItem onClick={() => navigate("/report-users")}>Report Users</NavItem>
        <NavItem onClick={() => navigate("/manage-movies")}>Manage Movies</NavItem>
        <NavItem onClick={() => navigate("/reports")}>Reports</NavItem>
        {/* New Profile Item */}
        <NavItem onClick={() => navigate("/OwnerProfile")}>Profile</NavItem>
        <MenuDivider />
        <NavItem as="span" onClick={handleLogout}>
          Logout
        </NavItem>
      </NavLinks>
    </Sidebar>
  );
};

export default OwnerNavbar;

// Styled Components
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background: #1a1a2e;
  color: white;
  padding-top: 60px;
`;

const NavLogo = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
`;

const NavItem = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #444;
  }
`;

const MenuDivider = styled.hr`
  height: 1px;
  background: #ccc;
`;
