const express = require('express');
const router = express.Router();
const dexReq = require("./dexcom");
const fitReq = require("./google");

router.get('/egvs', (req, res) => {
    dexReq(req);
    res.redirect("/");
});

router.get('/fit', (req, res) => {
    fitReq(req);
    res.redirect("/");
});

module.exports = router;
