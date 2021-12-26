import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <div>
    <div>
      <a href="/register">Register</a>
      <br />
      <a href="/login">Login</a>
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
