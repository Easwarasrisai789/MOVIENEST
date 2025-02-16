import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Hnavbar from "./Hnavbar";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    try {
      const response = await fetch("http://localhost:5000/api/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setIsEmailVerified(true);
        setStatus({ message: "✅ Email found. Set your new password.", type: "success" });
      } else {
        setStatus({ message: data.message || "❌ Email not found.", type: "error" });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus({ message: "❌ Server error. Try again.", type: "error" });
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });

    try {
      const response = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ message: "✅ Password updated! Redirecting...", type: "success" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setStatus({ message: data.message || "❌ Password reset failed.", type: "error" });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus({ message: "❌ Server error. Try again.", type: "error" });
    }
  };

  return (
    <>
      <Hnavbar />
      <AuthContainer>
        <AuthBox>
          <h2>Forgot Password</h2>
          {status.message && <MessageBox type={status.type}>{status.message}</MessageBox>}

          {!isEmailVerified ? (
            <Form onSubmit={handleEmailCheck}>
              <Label>Email:</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <AuthButton type="submit">Check Email</AuthButton>
            </Form>
          ) : (
            <Form onSubmit={handlePasswordReset}>
              <Label>New Password:</Label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <AuthButton type="submit">Change Password</AuthButton>
            </Form>
          )}
        </AuthBox>
      </AuthContainer>
    </>
  );
};

export default ForgotPassword;

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
