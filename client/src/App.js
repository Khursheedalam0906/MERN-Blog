import { useState } from "react";
import "./App.css";
import Login from "./components/account/Login";
import { Box } from "@mui/material";
import DataProvider from "./context/DataProvider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from "./components/create/CreatePost";
import DetailView from "./components/details/DetailView";
import UpdatePost from "./components/create/UpdatePost";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      {userAuthenticated ? (
        <BrowserRouter>
          <Header />
          <Box style={{ marginTop: 64 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/details/:id" element={<DetailView />} />
              <Route path="/update/:id" element={<UpdatePost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Box style={{ marginTop: 64 }}>
            <Navigate replace to="/login" />
            <Routes>
              <Route
                path="/login"
                element={<Login setUserAuthenticated={setUserAuthenticated} />}
              />
            </Routes>
          </Box>
        </BrowserRouter>
      )}
    </DataProvider>
  );
}

export default App;
