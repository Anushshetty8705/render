import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {

    try {

      const res = await axios.post("http://localhost:3000/forgot-password", data);

      toast.success("Password reset link sent");

      console.log(res.data);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );

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
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>

            <label className="text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-indigo-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Password */}
          <div>

            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-300">
                Password
              </label>

              {/* Forgot Password */}
              <Link
                to="/forgot-password"
                className="text-sm text-indigo-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-indigo-400"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-600"></div>
            OR
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full border border-gray-500 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-center text-gray-400 text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-400 hover:underline"
            >
              Sign up
            </Link>
          </p>

        </form>

      </motion.div>

    </div>
  );
}