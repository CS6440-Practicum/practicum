const { User } = require("../../database/sequelize");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { v4: uuidv4 } = require('uuid');

async function googleCallback(request, accessToken, refreshToken, profile, done) {
        console.log("Google auth success!");
        console.log("accessToken, refreshToken", accessToken, refreshToken)
        console.log("profile", profile);

        const [user, created] = await User.findOrCreate({
            where: {email: profile.email},
            defaults: {
                id: uuidv4(),
                name: profile.displayName,
            }
        });

        console.log("user is", user, created);
        user.googleAccessToken = accessToken;
        user.googleRefreshToken = refreshToken;

        await user.save();

        return done(null, user);
}

const googleStrategy = new GoogleStrategy({
        clientID: process.env.FIT_ID,
        clientSecret: process.env.FIT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    googleCallback
);

module.exports = googleStrategy
