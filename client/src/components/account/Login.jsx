import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import axios from "axios";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "40px 0 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

const Message = styled(Typography)`
  margin-top: 15px;
  font-weight: 700;
  font-size: 18;
  text-align: center;
`;

const Login = ({ setUserAuthenticated }) => {
  const navigate = useNavigate();
  //
  const URL = "mern-blog-api-ten.vercel.app";
  const { setName, setUserName } = useContext(DataContext);
  //
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  //Login
  const [lusername, setlUsername] = useState("");
  const [lpassword, setlPassword] = useState("");

  //Signup
  const [sname, setsName] = useState("");
  const [susername, setsUsername] = useState("");
  const [spassword, setsPassword] = useState("");

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const loginvalue = {
    username: lusername,
    password: lpassword,
  };

  const signupvalue = {
    name: sname,
    username: susername,
    password: spassword,
  };

  const Login = async () => {
    const response = await axios.post(`${URL}/login`, loginvalue);
    if (response.status === 200) {
      setLoginMessage(response.data.message);
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setName(response.data.name);
      setUserName(response.data.username);
      setLoginMessage("");
      navigate("/");
      setUserAuthenticated(true);
    } else if (response.status === 401) {
      setLoginMessage(response.data.message);
      setTimeout(() => {
        setLoginMessage("");
      }, 4000);
    } else if (response.status === 500) {
      setLoginMessage(response.data.message);
      setTimeout(() => {
        setLoginMessage("");
      }, 4000);
    } else {
      setLoginMessage("Something went wrong");
      setTimeout(() => {
        setLoginMessage("");
      }, 4000);
    }
  };

  const Signup = async () => {
    const response = await axios.post(`${URL}/signup`, signupvalue);
    if (response.status === 201) {
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
        setLogin(true);
      }, 4000);
    } else if (response.status === 400) {
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } else if (response.status === 500) {
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } else {
      setMessage("Something went wrong");
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }
  };

  return (
    <div>
      {login ? (
        <Component>
          <Image src={imageURL} alt="blog-logo" />
          {loginMessage && (
            <Box>
              <Message>{loginMessage}</Message>
            </Box>
          )}
          <Wrapper>
            <TextField
              value={lusername}
              variant="standard"
              placeholder="Enter Username"
              onChange={(e) => setlUsername(e.target.value)}
            />
            <TextField
              value={lpassword}
              variant="standard"
              placeholder="Enter Password"
              onChange={(e) => setlPassword(e.target.value)}
            />
            <LoginButton variant="contained" onClick={() => Login()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={() => setLogin(false)}>
              Create an account
            </SignupButton>
          </Wrapper>
        </Component>
      ) : (
        <Component>
          <Image src={imageURL} alt="blog-logo" />
          {message && (
            <Box>
              <Message>{message}</Message>
            </Box>
          )}
          <Wrapper>
            <TextField
              value={sname}
              variant="standard"
              placeholder="Enter Name"
              onChange={(e) => setsName(e.target.value)}
            />
            <TextField
              value={susername}
              variant="standard"
              placeholder="Enter Username"
              onChange={(e) => setsUsername(e.target.value)}
            />
            <TextField
              value={spassword}
              variant="standard"
              placeholder="Enter Password"
              onChange={(e) => setsPassword(e.target.value)}
            />
            <SignupButton onClick={() => Signup()}>Sign Up</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => setLogin(true)}>
              Already have an account
            </LoginButton>
          </Wrapper>
        </Component>
      )}
    </div>
  );
};

export default Login;
