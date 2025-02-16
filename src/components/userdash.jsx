// UserDash.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UNavbar from "./UNavbar";

const UserDash = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <>
      <UNavbar />
      <DashboardContainer>
        <Header>
          <h1>Welcome, {userName || "User"}!</h1>
        </Header>
        <SearchBar type="text" placeholder="Search movies, events, and more..." />
      </DashboardContainer>
    </>
  );
};

export default UserDash;

// Styled Components
const DashboardContainer = styled.div`
  padding: 20px;
  background: white;
  color: black;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
