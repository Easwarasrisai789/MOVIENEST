import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Hnavbar from "./Hnavbar";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }), // Send role to backend
      });

      const data = await response.json();
      console.log("Response from backend:", response.status, data);

      if (response.ok) {
        // Store user details
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("email", data.user.email);

        setStatus({ message: "Login successful! Redirecting...", type: "success" });

        // Redirect based on role
        setTimeout(() => {
          if (data.user.role === "admin") {
            navigate("/admindash");
          } else if (data.user.role === "owner") {
            navigate("/ownerdash");
          } else {
            navigate("/userdash");
          }
        }, 1500);
      } else {
        setStatus({ message: data.message || "Invalid credentials!", type: "error" });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus({ message: "Server error. Please try again.", type: "error" });
    }
  };

  return (
    <>
      <Hnavbar />
      <AuthContainer>
        <AuthBox>
          <h2>Login</h2>
          {status.message && <MessageBox type={status.type}>{status.message}</MessageBox>}
          <Form onSubmit={handleLogin}>
            <Label>Email:</Label>
            <Input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Label>Password:</Label>
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label>Select Role:</Label>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="owner">Owner</option>
            </Select>
            <AuthButton type="submit">Login</AuthButton>
            <ForgotPasswordLink onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </ForgotPasswordLink>
          </Form>
        </AuthBox>
      </AuthContainer>
    </>
  );
};

export default Login;

// Styled Components
const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/image.png') no-repeat center center/cover;
`;

const AuthBox = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: white;
  width: 360px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 5px 0;
  border: 1px solid #777;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: white;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin: 5px 0;
  border: 1px solid #777;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: black; /* Fixed: Text inside the dropdown is now black */
  font-weight: bold;
  cursor: pointer;

  &:focus {
    background: rgba(255, 255, 255, 0.25);
    outline: none;
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
`;

const MessageBox = styled.div`
  background: ${({ type }) => (type === "success" ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)")};
  padding: 12px;
  border-radius: 5px;
  color: ${({ type }) => (type === "success" ? "#00ff00" : "#ff4444")};
`;

const ForgotPasswordLink = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
