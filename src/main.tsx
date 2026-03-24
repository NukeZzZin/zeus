import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Box } from "@mui/material";

import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import CreatePage from "@pages/CreatePage";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Protected from "@components/Protected";

import "@/globals.css";

{/* TODO: Planos futuros:
  Implementar títulos dinâmicos,
  Implementar rotas para posts,
  Implementar rotas para usuários */}

ReactDOM.createRoot(document.getElementById("app-mount")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar/>
        <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/create" element={<Protected children={<CreatePage/>}/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
        </Box>
        <Footer/>
      </Box>
    </BrowserRouter>
  </React.StrictMode>
);
