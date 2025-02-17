import React from "react";
import styled from "styled-components";
import { FaFilm, FaChartLine, FaExclamationTriangle } from "react-icons/fa"; // Updated to include new icon for Report User
import { Link } from "react-router-dom";
import OwnerNavbar from "./OwnerNavbar";

const OwnerDashboard = () => {
  return (
    <Container>
      <OwnerNavbar />
      <Content>
        <Header>
          <h1>Welcome to the MOVIENEST Owner Dashboard</h1>
        </Header>
        <DashboardOptions>
          {/* Report User Card */}
          <OptionCard>
            <FaExclamationTriangle size={50} />
            <OptionTitle>Report User</OptionTitle>
            <OptionLink to="/report-user">View Reported Users</OptionLink>
          </OptionCard>
          {/* Manage Movies Card */}
          <OptionCard>
            <FaFilm size={50} />
            <OptionTitle>Manage Movies</OptionTitle>
            <OptionLink to="/manage-movies">Go to Movie Management</OptionLink>
          </OptionCard>
          {/* Reports & Analytics Card */}
          <OptionCard>
            <FaChartLine size={50} />
            <OptionTitle>Reports & Analytics</OptionTitle>
            <OptionLink to="/reports">View Reports</OptionLink>
          </OptionCard>
        </DashboardOptions>
      </Content>
    </Container>
  );
};

export default OwnerDashboard;

// Styled Components
const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* Space for the navbar */
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const DashboardOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const OptionCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const OptionTitle = styled.h3`
  margin-top: 15px;
  font-size: 18px;
`;

const OptionLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1a1a2e;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
  }
`;
