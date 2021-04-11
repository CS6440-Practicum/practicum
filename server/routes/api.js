const express = require('express');
const router = express.Router();
const dexReq = require("./dexcom");
const fitReq = require("./google");
const { isAuthenticated, hasTokens } = require("../auth/auth");

router.get('/egvs', isAuthenticated, hasTokens, async(req, res) => {
    const json = await dexReq(req);
    res.json(json);
});

router.get('/fit', isAuthenticated, hasTokens, async(req, res) => {
    const json = await fitReq(req);
    res.json(json);
});

module.exports = router;
