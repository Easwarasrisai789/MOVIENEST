import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Hnavbar from "./Hnavbar";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    try {
      const response = await axios.post("http://localhost:5000/api/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setStatus({ message: response.data.message, type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "❌ Registration failed. Try again!";
      setStatus({ message: errorMessage, type: "error" });
    }
  };

  return (
    <>
      <Hnavbar />
      <AuthContainer>
        <AuthBox>
          <h2>Register</h2>
          {status.message && <MessageBox type={status.type}>{status.message}</MessageBox>}
          <Form onSubmit={handleRegister}>
            <FormGroup>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number:</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="off"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </FormGroup>

            <AuthButton type="submit">Register</AuthButton>
          </Form>
          <p>
            Already have an account?{" "}
            <AuthLink onClick={() => navigate("/login")}>Login Here</AuthLink>
          </p>
        </AuthBox>
      </AuthContainer>
    </>
  );
};

export default Register;

// 🌟 Styled Components for better UI

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("/assets/background.jpg") no-repeat center center/cover;
`;

const AuthBox = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: white;
  width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
`;

const Label = styled.label`
  font-size: 1rem;
  color: white;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #777;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const AuthButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: #ff4444;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ff2222;
  }
`;

const AuthLink = styled.span`
  color: #ff4444;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const MessageBox = styled.div`
  background: ${({ type }) => (type === "success" ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)")};
  padding: 12px;
  border-radius: 5px;
  color: ${({ type }) => (type === "success" ? "#00ff00" : "#ff4444")};
  margin-bottom: 10px;
  font-weight: bold;
`;
