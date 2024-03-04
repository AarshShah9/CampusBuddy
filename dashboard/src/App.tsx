import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Table from "./components/Table";
import Login from "./components/Login";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="/dashboard/table" element={<Table />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
