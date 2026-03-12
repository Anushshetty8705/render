import Land from "./Land";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./components/Register";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}
