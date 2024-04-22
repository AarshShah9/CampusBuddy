import React, { useEffect } from "react";
import Layout from "./components/Layout";
import OrgTable from "./components/OrgTable";
import Login from "./components/Login";
import PostTable from "./components/PostTable";
import EventTable from "./components/EventTable";
import ItemTable from "./components/ItemTable";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/dashboard/orgTable");
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="orgTable" element={<OrgTable />} />
          <Route path="postTable" element={<PostTable />} />
          <Route path="eventTable" element={<EventTable />} />
          <Route path="itemTable" element={<ItemTable />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
