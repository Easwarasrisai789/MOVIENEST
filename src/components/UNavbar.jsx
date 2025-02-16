import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

const statesWithCities = {
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Nellore", "Kakinada", "Rajahmundry", "Tirupati"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi", "Belagavi"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
};

const UNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const userEmail = localStorage.getItem("email");
  const [stateName, setStateName] = useState(localStorage.getItem("selectedState") || "Andhra Pradesh");
  const [cityName, setCityName] = useState(localStorage.getItem("selectedCity") || "Fetching city...");

  // Function to update user location
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

            // ✅ Update the location in the MySQL database
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
  }, [userEmail]); // ✅ Include userEmail as a dependency

  useEffect(() => {
    updateLocation();
  }, [updateLocation]); // ✅ Fixes the ESLint warning

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <NavContainer>
      <MenuContainer ref={menuRef}>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars size={24} />
        </MenuButton>
        {menuOpen && (
          <DropdownMenu>
            <MenuItem onClick={() => navigate("/userdash")}>Dashboard</MenuItem>
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuDivider />
            <MenuItemLogout onClick={handleLogout}>Logout</MenuItemLogout>
          </DropdownMenu>
        )}
      </MenuContainer>

      <LocationContainer>
        <FaMapMarkerAlt style={{ cursor: "pointer" }} onClick={updateLocation} />
        <Dropdown value={stateName} onChange={handleStateChange}>
          {Object.keys(statesWithCities).map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </Dropdown>
        <Dropdown value={cityName} onChange={handleCityChange}>
          {statesWithCities[stateName].map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </Dropdown>
      </LocationContainer>
    </NavContainer>
  );
};

export default UNavbar;

// 🌟 Styled Components 🌟
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  color: black;
  padding: 15px 20px;
  position: relative;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const MenuContainer = styled.div`
  position: relative;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: black;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: #555;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: white;
  color: black;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 150px;
  text-align: left;
  z-index: 100;
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #eee;
  }
`;

const MenuDivider = styled.hr`
  border: none;
  height: 1px;
  background: #ccc;
  margin: 5px 0;
`;

const MenuItemLogout = styled(MenuItem)`
  color: red;
  font-weight: bold;
  &:hover {
    background: #ffcccc;
  }
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Dropdown = styled.select`
  padding: 5px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background: white;
  color: black;
`;
