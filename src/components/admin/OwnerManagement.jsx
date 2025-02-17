import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import AdminNavbar from "./AdminNavbar"; // Correct import for AdminNavbar
import { Link } from "react-router-dom";

const OwnerManagement = () => {
  const [owners, setOwners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/owners")
      .then((response) => {
        setOwners(response.data);
      })
      .catch((error) => {
        console.error("Error fetching owners:", error);
      });
  }, []);

  const handleDelete = (ownerId) => {
    axios
      .delete(`http://localhost:5000/api/owners/${ownerId}`)
      .then(() => {
        setOwners(owners.filter((owner) => owner.id !== ownerId));
      })
      .catch((error) => {
        console.error("Error deleting owner:", error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOwners = owners.filter(owner => 
    owner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <AdminNavbar /> {/* Use AdminNavbar here */}
      <MainContent>
        <h1>Owner Management</h1>

        <SearchBarContainer>
          <SearchInput
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchBarContainer>

        <OwnerTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOwners.length > 0 ? (
              filteredOwners.map((owner) => (
                <tr key={owner.id}>
                  <td>{owner.name}</td>
                  <td>{owner.email}</td>
                  <td>
                    <Link to={`/edit-owner/${owner.id}`}>Edit</Link> |{" "}
                    <button onClick={() => handleDelete(owner.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No owners found</td>
              </tr>
            )}
          </tbody>
        </OwnerTable>
      </MainContent>
    </Container>
  );
};

export default OwnerManagement;

// Styled Components
const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* Offset for the fixed sidebar */
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

const OwnerTable = styled.table`
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
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;
  }

  button:hover {
    background-color: #d32f2f;
  }

  a {
    text-decoration: none;
    color: #007bff;
  }

  a:hover {
    text-decoration: underline;
  }
`;
