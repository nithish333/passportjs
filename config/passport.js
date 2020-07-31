const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");

//Serialising the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//Deserialize the user
passport.deserializeUser(async (id, done) => {
  const userFromId = await User.findById(id);
  done(null, userFromId);
});
//Tell passport we use google strategy

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "460819019930-c8eq5cgi9n6e3t2559cdqv728p8p8a87.apps.googleusercontent.com",
      clientSecret: "aHTYQgNAZzvVb8ZcVpdAaDks",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //Passport callback function
      //Find an existing user
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log("Existed user : " + existingUser);
        done(null, existingUser);
      } else {
        const user = await new User({
          displayName: profile.displayName,
          googleId: profile.id,
        }).save();
        console.log("User created " + user);
        done(null, user);
      }
    }
  )
);
