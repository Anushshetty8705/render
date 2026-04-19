const router = require("express").Router();
const passport = require("passport");


// ================= GOOGLE =================

// Step 1: Redirect to Google
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google Callback
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);


// ================= GITHUB =================

// Step 1: Redirect to GitHub
router.get("/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// Step 2: GitHub Callback
router.get("/github/callback",
   passport.authenticate("github", {
    failureRedirect: "/login",
    session: false   // ✅ IMPORTANT
  }),
  (req, res) => {
    res.redirect("http://localhost:5173");
  }
);


// ================= COMMON =================

// Get logged-in user
router.get("/user", (req, res) => {
  res.send(req.user || null);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000");
  });
});

module.exports = router;