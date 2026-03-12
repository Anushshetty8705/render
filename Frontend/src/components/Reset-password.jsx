import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function ResetPassword() {

  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/update-password",
        {
          token: token,
          password: data.password
        }
      );

      toast.success(res.data.message || "Password updated");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Reset failed"
      );

    } finally {

      setLoading(false);

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
          Reset Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* New Password */}
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
          />

          {errors.password && (
            <p className="text-red-400 text-sm">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
            {...register("confirmPassword", {
              required: "Confirm password required"
            })}
          />

          {errors.confirmPassword && (
            <p className="text-red-400 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 py-3 rounded-lg"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </form>

      </motion.div>
    </div>
  );
}