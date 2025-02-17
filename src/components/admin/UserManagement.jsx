import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import AdminNavbar from "./AdminNavbar"; // Import the AdminNavbar

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch user data from the backend API
    axios
      .get("http://localhost:5000/api/users") // Ensure this is the correct endpoint from your backend
      .then((response) => {
        // Check if the response data is valid and an array
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data); // Set users data
        } else {
          console.error("Invalid data structure", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleDelete = (userId) => {
    // Call your API to delete the user
    axios
      .delete(`http://localhost:5000/api/users/${userId}`)
      .then(() => {
        // Filter out the deleted user from the users list
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  // Filter users by email if a search term is provided
  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle redirect to EditUser page
  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`); // Navigate to the edit user page
  };

  return (
    <Container>
      <AdminNavbar />
      <MainContent>
        <h1>User Management</h1>

        {/* Search Bar */}
        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchBarContainer>

        <UserTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button onClick={() => handleEdit(user.id)}>Edit</button> |{" "}
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No users found</td>
              </tr>
            )}
          </tbody>
        </UserTable>
      </MainContent>
    </Container>
  );
};

export default UserManagement;

// Styled Components
const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px;
`;

const SearchBarContainer = styled.div`
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

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  text-align: left;

  th, td {
    padding: 10px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
  }

  button:hover {
    background-color: #0056b3;
  }
`;
