import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session or token
    localStorage.removeItem("authToken"); // Assuming you're using localStorage for authentication
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <MenuButton>
        <FiMenu size={30} />
      </MenuButton>

      <Sidebar>
        <CloseButton>×</CloseButton>
        <NavLogo>MOVIENEST Admin</NavLogo>
        <NavLinks>
          <NavItem to="/Admindashboard">Dashboard</NavItem>
          <NavItem to="/UserManagement">User Management</NavItem>
          <NavItem to="/OwnerManagement">OwnerManagement</NavItem>
          <NavItem to="/admin/movies">Movie Management</NavItem>
          <NavItem to="/admin/reports">Reports & Logs</NavItem>
          <NavItem as="span" onClick={handleLogout}>
            Logout
          </NavItem>
        </NavLinks>
      </Sidebar>
    </>
  );
};

export default AdminNavbar;

// Styled Components
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0; /* Always keep it visible */
  width: 250px;
  height: 100%;
  background: #1a1a2e;
  color: white;
  padding-top: 60px;
  transition: left 0.3s ease-in-out;
`;

const MenuButton = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;
  cursor: pointer;
  background: #1a1a2e;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
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

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 10px;
  transition: 0.3s;

  &:hover {
    color: #ff4444;
  }

  // Allow 'span' for logout
  &:first-child {
    cursor: pointer;
  }
`;
