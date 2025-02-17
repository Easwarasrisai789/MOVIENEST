import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import UNavbar from "./UNavbar";
import { FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const statesWithCities = {
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Nellore", "Kakinada", "Rajahmundry", "Tirupati"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi", "Belagavi"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
};

const UserDash = () => {
  const [userName, setUserName] = useState("");
  const [stateName, setStateName] = useState(localStorage.getItem("selectedState") || "Andhra Pradesh");
  const [cityName, setCityName] = useState(localStorage.getItem("selectedCity") || "Fetching city...");
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const updateLocation = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const address = response.data.address;

            let detectedState = address.state || "Unknown State";
            let detectedCity = address.city || address.county || address.town || "Unknown City";

            if (!statesWithCities[detectedState]) {
              detectedState = "Andhra Pradesh";
            }

            if (!statesWithCities[detectedState].includes(detectedCity)) {
              detectedCity = statesWithCities[detectedState][0] || "Unknown City";
            }

            setStateName(detectedState);
            setCityName(detectedCity);
            localStorage.setItem("selectedState", detectedState);
            localStorage.setItem("selectedCity", detectedCity);

            if (userEmail) {
              await axios.put("http://localhost:5000/api/update-location", {
                email: userEmail,
                state: detectedState,
                city: detectedCity,
              });
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            setCityName("Location not available");
          }
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          setCityName("Location access denied");
        }
      );
    } else {
      setCityName("Geolocation not supported");
    }
  }, [userEmail]);

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setStateName(selectedState);
    setCityName(statesWithCities[selectedState][0] || "Select a city");
    localStorage.setItem("selectedState", selectedState);
    localStorage.setItem("selectedCity", statesWithCities[selectedState][0] || "Select a city");
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCityName(selectedCity);
    localStorage.setItem("selectedCity", selectedCity);
  };

  return (
    <Container>
      <UNavbar />
      <Content>
        <DashboardContainer>
          <LocationWrapper>
            <FaMapMarkerAlt style={{ cursor: "pointer" }} onClick={updateLocation} />
            <Dropdown value={stateName} onChange={handleStateChange}>
              {Object.keys(statesWithCities).map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </Dropdown>
            <Dropdown value={cityName} onChange={handleCityChange}>
              {statesWithCities[stateName].map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </Dropdown>
          </LocationWrapper>
          <Header>
            <h1>Welcome, {userName || "User"}!</h1>
          </Header>
          <SearchBar type="text" placeholder="Search movies, events, and more..." />
        </DashboardContainer>
      </Content>
    </Container>
  );
};

export default UserDash;

// Styled Components
const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* Make space for the navbar */
  overflow: hidden; /* Remove scrollbar completely */
`;

const DashboardContainer = styled.div`
  padding: 20px;
  background: white;
  color: black;
  max-width: 100%; /* Ensure the container doesn't overflow */
`;

const LocationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
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

const Dropdown = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  max-width: 200px;
  display: inline-block;
`;
