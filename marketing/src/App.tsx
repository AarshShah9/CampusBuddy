import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
