import Land from "./Land";
import { Routes, Route} from "react-router-dom";
import Login from "./Login";
import Register from "./components/Register";
import ForgotPassword from "./components/Forgot-password";


export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Land />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
      </Routes>
    </>
  );
}
