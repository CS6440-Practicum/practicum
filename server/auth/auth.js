const express = require('express');
const router = express.Router();
const passport = require('passport');
const googleStrategy = require("./strategies/google");
const dexcomStrategy = require("./strategies/dexcom");

const { User } = require("../database/sequelize");
const { v4: uuidv4 } = require('uuid');


passport.use(dexcomStrategy);
passport.use(googleStrategy);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    done(null, await User.findOne({ where: { id } }));
});

router.get('/dexcom', isAuthenticated, redirectIfDexcomLinked,
    passport.authorize('oauth2'));

router.get('/dexcom/callback',
    passport.authorize('oauth2', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect(req.session.returnTo || "/");
    });

router.get('/google', redirectIfGoogleLinked,
    passport.authenticate('google', { scope: [ 'email', 'profile', 'https://www.googleapis.com/auth/fitness.activity.read' ] }));

router.get( '/google/callback',
    passport.authenticate( 'google', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect(req.session.returnTo || "/");
    });

router.get('/user', (req, res, next) => {
    const user = req.user;

    if (!user) {
        return res.json({
            authenticated: false,
        })
    }

    return res.json({
        authenticated: true,
        name: user.name,
        email: user.email,
        googleAuthComplete: user.googleAccessToken !== null,
        dexcomAuthComplete: user.dexcomAccessToken !== null
    });
})

router.get("/logout", ((req, res) => {
    req.logout();
    res.redirect("/");
}))

// isAuthenticated middleware adapted from the HackGT Bolt project, licensed under the MIT License
// https://github.com/HackGT/bolt/blob/dcc19212c76e2ceafa8177051eaa764704e07a89/server/src/auth/auth.ts#L53
function isAuthenticated(request, response, next) {
    response.setHeader("Cache-Control", "private");
    if (!request.isAuthenticated() || !request.user) {
        if (request.session) {
            request.session.returnTo = request.originalUrl;
        }
        response.redirect("/auth/google");
    } else {
        next();
    }
}

function redirectIfGoogleLinked(request, response, next) {
    if (request.user && request.user.googleAccessToken) {
        response.redirect("/");
    } else {
        next();
    }
}

function redirectIfDexcomLinked(request, response, next) {
    if (!request.query.force && request.user && request.user.dexcomAccessToken) {
        response.redirect("/");
    } else {
        next();
    }
}

module.exports = {
    isAuthenticated,
    router
};
