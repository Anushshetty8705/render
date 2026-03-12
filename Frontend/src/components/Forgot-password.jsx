import { motion } from "framer-motion";
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

export default function ForgotPassword() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const sendResetLink = async (data) => {

    try {

      const res = await axios.post(
        "http://localhost:3000/forgot-password",
        { email: data.email }
      );

      toast.success(res.data.message);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to send reset link"
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
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit(sendResetLink)} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600"
            {...register("email", {
              required: "Email is required"
            })}
          />

          {errors.email && (
            <p className="text-red-400 text-sm">
              {errors.email.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 py-3 rounded-lg"
          >
            Send Reset Link
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-lg"
            onClick={() => window.location.href = "/login"}
          >
            Back to Login
          </button>

        </form>

      </motion.div>
    </div>
  );
}