const express = require('express');
const router = express.Router();
const dexReq = require("./dexcom");
const fitReq = require("./google");
const { isAuthenticated, hasTokens } = require("../auth/auth");

router.get('/egvs', isAuthenticated, hasTokens, (req, res) => {
    dexReq(req);
    res.redirect("/");
});

router.get('/fit', isAuthenticated, hasTokens, (req, res) => {
    fitReq(req);
    res.redirect("/");
});

module.exports = router;
