import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const Land = () => {
  return (
    <div className="bg-[#0f172a]  text-white overflow-x-hidden">

      {/* HERO */}

      <section
        className="h-screen flex flex-col justify-center items-center text-center px-6 relative"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10">

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-6xl font-bold leading-tight"
          >
            Share Your Ride <br />
            <span className="text-indigo-400">
              Travel Smarter Together
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-300 max-w-xl"
          >
            Offer free or paid rides while travelling and help
            people reach their destination faster and cheaper.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
            className="mt-8 flex gap-6 justify-center"
          >
            <Link to="/login">
              <button className="bg-indigo-500 px-7 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition">
                Offer Ride
              </button>
            </Link>

            <button className="border border-gray-500 px-7 py-3 rounded-xl hover:bg-gray-800 transition">
              Find Ride
            </button>
          </motion.div>

        </div>
      </section>

      {/* STATS */}

      <section className="py-20 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">

        <motion.div variants={fadeUp} initial="hidden" whileInView="show">
          <h2 className="text-4xl font-bold text-indigo-400">10K+</h2>
          <p className="text-gray-400 mt-2">Active Riders</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show">
          <h2 className="text-4xl font-bold text-indigo-400">5K+</h2>
          <p className="text-gray-400 mt-2">Daily Rides</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show">
          <h2 className="text-4xl font-bold text-indigo-400">100+</h2>
          <p className="text-gray-400 mt-2">Cities Covered</p>
        </motion.div>

      </section>

      {/* FEATURES */}

      <section className="py-24 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:scale-105 transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/743/743131.png"
            className="w-14 mb-4 text-white"
          />

          <h3 className="text-xl font-semibold mb-3">
            Free Ride
          </h3>

          <p className="text-gray-400">
            Help others reach their destination by offering
            empty seats in your car.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:scale-105 transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
            className="w-14 mb-4"
          />

          <h3 className="text-xl font-semibold mb-3">
            Paid Ride
          </h3>

          <p className="text-gray-400">
            Share travel costs with passengers heading
            the same direction.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:scale-105 transition"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
            className="w-14 mb-4"
          />

          <h3 className="text-xl font-semibold mb-3">
            Safe Travel
          </h3>

          <p className="text-gray-400">
            Verified users, ratings, and secure booking
            system for safe journeys.
          </p>
        </motion.div>

      </section>

      {/* HOW IT WORKS */}

      <section className="py-24 bg-[#0f0b1f]  text-center px-6">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-bold mb-16"
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

          <motion.div variants={fadeUp} initial="hidden" whileInView="show">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920256.png"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">Post Ride</h3>
            <p className="text-gray-400">
              Enter your travel route and choose free or paid ride.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.2 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">Match Riders</h3>
            <p className="text-gray-400">
              Riders going the same direction request your ride.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.4 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              className="w-16 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">Travel Together</h3>
            <p className="text-gray-400">
              Meet and enjoy the ride while saving money.
            </p>
          </motion.div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-28 text-center">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="text-4xl font-bold"
        >
          Ready to Share Your Ride?
        </motion.h2>

        <motion.button
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ delay: 0.2 }}
          className="mt-8 bg-indigo-500 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-600 transition"
        >
          Get Started
        </motion.button>

      </section>

    </div>
  )
}

export default Land
