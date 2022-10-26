import React from "react";
import { Route, Routes } from "react-router-dom";
// We will create these two pages in a moment
import HomePage from "./components/HomePage/HomePage";
import FrontPage from "./components/FrontPage/FrontPage";

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/home" element={<FrontPage />} />
    </Routes>
  );
}
