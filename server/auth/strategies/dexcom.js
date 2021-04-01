const OAuth2Strategy = require('passport-oauth2').Strategy;

const dexcomStrategy = new OAuth2Strategy({
        authorizationURL: 'https://sandbox-api.dexcom.com/v2/oauth2/login',
        tokenURL: 'https://sandbox-api.dexcom.com/v2/oauth2/token',
        clientID: process.env.DEXCOM_ID,
        clientSecret: process.env.DEXCOM_SECRET,
        callbackURL: "http://localhost:3000/auth/dexcom/callback",
        passReqToCallback: true
    },
    async function(req, accessToken, refreshToken, profile, cb) {
        const user = req.user;

        user.dexcomAccessToken = accessToken;
        user.dexcomRefreshToken = refreshToken
        await user.save();
        return cb(null, user);
    }
);

module.exports = dexcomStrategy;
