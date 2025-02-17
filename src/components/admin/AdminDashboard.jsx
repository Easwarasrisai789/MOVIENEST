import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import AdminNavbar from '../admin/AdminNavbar'; // AdminNavbar import
import styled from 'styled-components';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);

const AdminDashboard = () => {
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  useEffect(() => {
    // Fetch user stats for the pie chart
    axios.get('http://localhost:5000/api/users/stats')
      .then(response => {
        updateCharts(response.data);
      })
      .catch(error => {
        console.error("Error fetching user stats:", error);
      });
  }, []);

  const updateCharts = (stats) => {
    // Update Bar chart data
    setBarData({
      labels: ['Users', 'Owners'],
      datasets: [
        {
          label: 'User and Owner Stats',
          data: [stats.users, stats.owners],
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(40, 212, 231, 0.6)'],
        },
      ],
    });

    // Update Pie chart data
    setPieData({
      labels: ['Users', 'Owners'],
      datasets: [
        {
          label: 'User vs Owners',
          data: [stats.users, stats.owners],
          backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(27, 202, 218, 0.6)'],
        },
      ],
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  return (
    <Container>
      <AdminNavbar /> {/* Admin Navbar here */}
      <DashboardContent>
        {/* Search Bar */}
        <SearchBarContainer>
          <SearchInput 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
          />
        </SearchBarContainer>
        <h1>Admin Dashboard</h1>
        <ChartsContainer>
          {/* Bar Chart */}
          <ChartWrapper className="bar-chart">
            <h3>User and Owner Stats (Bar Chart)</h3>
            {barData && <Bar data={barData} />}
          </ChartWrapper>
          {/* Pie Chart */}
          <ChartWrapper className="pie-chart">
            <h3>User vs Owners (Pie Chart)</h3>
            {pieData && <Pie data={pieData} />}
          </ChartWrapper>
        </ChartsContainer>
      </DashboardContent>
    </Container>
  );
};

export default AdminDashboard;

// Styled Components

const Container = styled.div`
  display: flex;
`;

const DashboardContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* Offset for the fixed sidebar (AdminNavbar) */
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff4444;
  }
`;

const ChartsContainer = styled.div`
  display: flex; /* Makes the charts appear side by side */
  gap: 20px; /* Adds space between the charts */
`;

const ChartWrapper = styled.div`
  flex: 1; /* Makes each chart take equal space */
  max-width: 45%; /* Limits the width of each chart */
  height: 300px; /* Adjusts the height */
  background-color: #f4f4f4; /* Optional: for better visualization */
  padding: 20px;
  border-radius: 10px; /* Optional: rounds the corners */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
