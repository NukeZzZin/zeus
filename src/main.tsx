import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Box } from "@mui/material";

const CreatePage = lazy(() => import("@pages/CreatePage"));
const HomePage = lazy(() => import("@pages/HomePage"));
const LoginPage = lazy(() => import("@pages/LoginPage"));
const LogoutPage = lazy(() => import("@pages/LogoutPage"));
const PostPage = lazy(() => import("@pages/PostPage"));
const RegisterPage = lazy(() => import("@pages/RegisterPage"));

import Footer from "@components/Footer";
import Loading from "@components/Loading";
import Navbar from "@components/Navbar";
import Protected from "@components/Protected";

import "@/globals.css";

{/* TODO: Planos futuros:
  Implementar títulos dinâmicos (react-helmet),
  Implementar rotas para usuários*/}

ReactDOM.createRoot(document.getElementById("app-mount")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar/>
        <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <React.Suspense fallback={<Loading/>}>
            <Routes>
              <Route path="/create" element={<Protected><CreatePage /></Protected>} />
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </React.Suspense>
        </Box>
        <Footer/>
      </Box>
    </BrowserRouter>
  </React.StrictMode>
);
