import React, { useEffect, useState } from "react";
import axios from "axios";
import UNavbar from "./UNavbar";
import styled from "styled-components";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ name: "", phone: "" });

  // Get user email from local storage
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    if (userEmail) {
      axios
        .get(`http://localhost:5000/api/user-profile?email=${userEmail}`)
        .then((response) => {
          if (response.data) {
            setUser(response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setLoading(false);
        });
    }
  }, [userEmail]);

  const handleEdit = () => {
    setTempUser({ name: user.name, phone: user.phone });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    axios
      .put("http://localhost:5000/api/update-profile", {
        email: user.email,
        name: tempUser.name,
        phone: tempUser.phone,
        password: user.password,
        location: user.location,
      })
      .then(() => {
        alert("Profile updated successfully!");
        setUser({ ...user, name: tempUser.name, phone: tempUser.phone });
        setEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <>
      <UNavbar />
      <ProfileContainer>
        <ProfileCard>
          <Title>Profile Details</Title>
          {loading ? (
            <LoadingText>Loading profile...</LoadingText>
          ) : (
            <>
              <ProfileField>
                <Label>Email:</Label> <Value>{user.email}</Value>
              </ProfileField>
              <ProfileField>
                <Label>Name:</Label>
                {editing ? (
                  <InputField
                    type="text"
                    value={tempUser.name}
                    onChange={(e) =>
                      setTempUser({ ...tempUser, name: e.target.value })
                    }
                  />
                ) : (
                  <Value>{user.name}</Value>
                )}
              </ProfileField>
              <ProfileField>
                <Label>Phone:</Label>
                {editing ? (
                  <InputField
                    type="text"
                    value={tempUser.phone}
                    onChange={(e) =>
                      setTempUser({ ...tempUser, phone: e.target.value })
                    }
                  />
                ) : (
                  <Value>{user.phone}</Value>
                )}
              </ProfileField>
            </>
          )}

          {editing ? (
            <ButtonContainer>
              <SaveButton onClick={handleSave}>Save</SaveButton>
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            </ButtonContainer>
          ) : (
            <EditButton onClick={handleEdit}>✏️ Edit</EditButton>
          )}
        </ProfileCard>
      </ProfileContainer>
    </>
  );
};

export default Profile;

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f5f5, #ffffff);
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 30px;
  width: 90%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid #ddd;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8rem;
  font-weight: 600;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1rem;
`;

const ProfileField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  padding: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
  font-size: 1rem;
`;

const Value = styled.span`
  color: #333;
  font-size: 1rem;
`;

const InputField = styled.input`
  width: 70%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
  color: #333;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;

const EditButton = styled.button`
  cursor: pointer;
  font-size: 16px;
  padding: 12px 20px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.3);
  transition: 0.3s;
  &:hover {
    background: #0056b3;
    transform: scale(1.05);
  }
`;

const SaveButton = styled(EditButton)`
  background: #28a745;
  &:hover {
    background: #218838;
  }
`;

const CancelButton = styled(EditButton)`
  background: #dc3545;
  &:hover {
    background: #c82333;
  }
`;