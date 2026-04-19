const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const githubstrategy =require("passport-github2").Strategy
const connectDB = require("../db");
const { v4: uuidv4 } = require('uuid');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = await connectDB();


        // ✅ If not, create user
    
          const newUser = {
            id: uuidv4(),
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
            provider: "google",
            createdAt: new Date(),
        }
         await db.collection("users").insertOne(newUser);
         let user = newUser;

        // ✅ VERY IMPORTANT
        return done(null, user);

      } catch (err) {
        return done(err, null); // ✅ correct error handling
      }
    }
  )
);
passport.use(
  new githubstrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can save user to DB
      return done(null, profile);
    }
  )
);

// store user in session
passport.serializeUser((user, done) => {
  done(null, user.id); // only ID
});

passport.deserializeUser((id, done) => {
  // fetch user from DB using ID
  done(null, { id });
});