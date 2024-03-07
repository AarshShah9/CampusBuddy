import React, { useEffect } from "react";
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
    } else {
      navigate("/dashboard/table");
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
