import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Success from "./pages/Success";

function App() {
  return (
    <div>
    <div>
      <a href="/register">Register</a>
      <br />
      <a href="/login">Login</a>
      <br />
      <a href="/success">Success</a>
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
