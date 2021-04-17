const OAuth2Strategy = require('passport-oauth2').Strategy;
const fetch = require('node-fetch');
const qs = require("querystring");

const dexcomStrategy = new OAuth2Strategy({
        authorizationURL: 'https://sandbox-api.dexcom.com/v2/oauth2/login',
        tokenURL: 'https://sandbox-api.dexcom.com/v2/oauth2/token',
        clientID: process.env.DEXCOM_ID,
        clientSecret: process.env.DEXCOM_SECRET,
        callbackURL: `${process.env.APP_BASE_URL}/auth/dexcom/callback`,
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

async function refreshDexcomToken(user) {
    const response = await fetch(`https://sandbox-api.dexcom.com/v2/oauth2/token`, {
        method: 'post',
        body: qs.stringify({
            client_secret: process.env.DEXCOM_SECRET,
            client_id: process.env.DEXCOM_ID,
            refresh_token: user.dexcomRefreshToken,
            grant_type: 'refresh_token',
            redirect_uri: `${process.env.APP_BASE_URL}/auth/dexcom/callback`
        }),
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache"
        },
    });
    
    const data = await response.json();

    if (data.access_token && data.refresh_token) {
        user.dexcomAccessToken = data.access_token;
        user.dexcomRefreshToken = data.refresh_token;
        await user.save();
    }
}

module.exports = { dexcomStrategy, refreshDexcomToken };
