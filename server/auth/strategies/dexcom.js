const OAuth2Strategy = require('passport-oauth2').Strategy;
const qs = require("querystring");
const http = require("https");

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
    var req = http.request(refreshOptions, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
      
        res.on("end", function () {
            var body = JSON.parse(Buffer.concat(chunks));
            console.log(body);

            if (body.access_token) {
                user.dexcomAccessToken = body.access_token;
            }
            if (body.refresh_token) {
                user.dexcomRefreshToken = body.refresh_token;
            }
        });
    });
    
    req.write(qs.stringify({
        client_secret: process.env.DEXCOM_SECRET,
        client_id: process.env.DEXCOM_ID,
        refresh_token: user.dexcomRefreshToken,
        grant_type: 'refresh_token',
        redirect_uri: `${process.env.APP_BASE_URL}/auth/dexcom/callback`
    }));
    req.end();

    await user.save();
}

const refreshOptions = {
  "method": "POST",
  "hostname": "api.dexcom.com",
  "port": null,
  "path": "/v2/oauth2/token",
  "headers": {
    "content-type": "application/x-www-form-urlencoded",
    "cache-control": "no-cache"
  }
};

module.exports = { dexcomStrategy, refreshDexcomToken };
