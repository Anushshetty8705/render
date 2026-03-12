import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function Register() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);

  const email = watch("email");
  const otp = watch("otp");

  // SEND OTP
  const sendOTP = async () => {

    if (!email) return toast.error("Enter email first");

    if (!email.endsWith("@gmail.com")) {
      return toast.error("Email must end with @gmail.com");
    }

    try {

      setSendingOtp(true);

      await axios.post("http://localhost:3000/send-otp", { email });

      setOtpSent(true);
      toast.success("OTP sent");

    } catch {

      toast.error("Failed to send OTP");

    } finally {

      setSendingOtp(false);

    }
  };

  // VERIFY OTP
  const verifyOTP = async () => {

    if (!otp) return toast.error("Enter OTP");

    if (otp.length !== 6) return toast.error("OTP must be 6 digits");

    try {

      setVerifyingOtp(true);

      const res = await axios.post("http://localhost:3000/verify-otp", {
        email,
        otp
      });

      if (res.data.success) {
        setOtpVerified(true);
        toast.success("OTP verified");
      }

    } catch (error) {

      toast.error(error.response?.data?.message || "OTP failed");

    } finally {

      setVerifyingOtp(false);

    }
  };

  // REGISTER
  const registerUser = async (data) => {

    if (!otpVerified) {
      return toast.error("Verify OTP first");
    }

    try {

      setRegistering(true);

      const res = await axios.post("http://localhost:3000/register", data);

      toast.success(res.data.message);

    } catch (error) {

      toast.error(error.response?.data?.message || "Registration failed");

    } finally {

      setRegistering(false);

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

        <form className="space-y-4" onSubmit={handleSubmit(registerUser)}>

          {/* NAME */}
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-lg bg-black/40"
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}

          {/* EMAIL */}
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-black/40"
          />
          {errors.email && <p className="text-red-400">{errors.email.message}</p>}

          {/* SEND OTP */}
          <button
            type="button"
            onClick={sendOTP}
            disabled={sendingOtp}
            className="w-full bg-blue-500 py-2 rounded"
          >
            {sendingOtp ? "Sending..." : "Send OTP"}
          </button>

          {/* OTP */}
          {otpSent && (
            <>
              <input
                {...register("otp", { required: "OTP is required" })}
                placeholder="Enter OTP"
                className="w-full px-4 py-3 rounded-lg bg-black/40"
              />

              {errors.otp && (
                <p className="text-red-400">{errors.otp.message}</p>
              )}

              <button
                type="button"
                onClick={verifyOTP}
                disabled={verifyingOtp || otpVerified}
                className="w-full bg-green-500 py-2 rounded"
              >
                {verifyingOtp
                  ? "Verifying..."
                  : otpVerified
                  ? "Verified ✓"
                  : "Verify OTP"}
              </button>
            </>
          )}

          {/* PASSWORD */}
          <div className="relative">
            <input
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
            <p className="text-red-400">{errors.password.message}</p>
          )}

          {/* REGISTER */}
          <button
            type="submit"
            disabled={registering}
            className="w-full bg-indigo-500 py-3 rounded-lg"
          >
            {registering ? "Registering..." : "Register"}
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