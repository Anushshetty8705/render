import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password && form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!form.otp) newErrors.otp = "OTP is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SEND OTP
  const sendOTP = async () => {

    if (!form.email) {
      return toast.error("Enter email first");
    }
    if(!form.email.endsWith("@gmail.com")){
      return toast.error("gmail should be end with @gmail.com");
    }

    try {
      await axios.post("http://localhost:3000/send-otp", {
        email: form.email
      });

      toast.success("OTP sent to email");

    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  // VERIFY OTP
  const verifyOTP = async () => {

    if (!form.otp) {
      return toast.error("Enter OTP");
    }

    try {

      const res = await axios.post("http://localhost:3000/verify-otp", {
        email: form.email,
        otp: form.otp
      });

      if (res.data.success) {
        setOtpVerified(true);
        toast.success("OTP Verified");
      } else {
        toast.error("Invalid OTP");
      }

    } catch (error) {
      toast.error("OTP verification failed");
    }
  };

  // REGISTER
  const registerUser = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!otpVerified) {
      return toast.error("Please verify OTP first");
    }

    try {

      const res = await axios.post("http://localhost:3000/register", form);

      toast.success(res.data.message);

    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white px-6"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <div className="absolute inset-0 bg-black/70"></div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-2xl w-full max-w-md"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={registerUser}>

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full name"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40"
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40"
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

          {/* SEND OTP */}
          <button
            type="button"
            onClick={sendOTP}
            className="w-full bg-blue-500 py-2 rounded"
          >
            Send OTP
          </button>

          {/* OTP */}
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-black/40"
          />
          {errors.otp && <p className="text-red-400 text-sm">{errors.otp}</p>}

          {/* VERIFY OTP */}
          <button
            type="button"
            onClick={verifyOTP}
            className="w-full bg-green-500 py-2 rounded"
          >
            Verify OTP
          </button>

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-black/40"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}

          {/* REGISTER */}
          <button
            type="submit"
            className="w-full bg-indigo-500 py-3 rounded-lg"
          >
            Register
          </button>

          <p className="text-center text-sm">
            Already have account?
            <Link to="/login" className="text-indigo-400"> Login</Link>
          </p>

        </form>
      </motion.div>
    </div>
  );
}