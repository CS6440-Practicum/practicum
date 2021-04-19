const express = require('express');
const router = express.Router();
const dexReq = require("./dexcom");
const fitReq = require("./google");
const {isAuthenticated, hasTokens} = require("../auth/auth");
const { DateTime } = require("luxon");

// router.get('/egvs', isAuthenticated, hasTokens, async (req, res) => {
//     const json = await dexReq(req);
//     res.json(json);
// });
//
// router.get('/fit', isAuthenticated, hasTokens, async (req, res) => {
//     const json = await fitReq(req);
//     res.json(json);
// });

/**
 * Converts an ISO 8601 timestamp to UTC and removes the Z for Dexcom
 * @param timestamp
 */
function getTimestampForDexcom(timestamp) {
    const date = DateTime.fromISO(timestamp);
    return date.setZone("UTC").toFormat("yyyy-MM-dd'T'HH:mm:ss");
}

/**
 * API endpoint to obtain merged data from Google Fit and Dexcom.
 *
 * Parameters:
 * - start: timestamp in ISO 8601 format
 * - end: timestamp in ISO 8601 format
 * - tz: desired output timestamp time zone (e.g., data will be returned with timestamp's displayed in this timezone)
 * Internally, the timestamps will be converted to UTC timestamps with the timezone stripped for Dexcom.  The ISO 8601
 * timestamp with timezone info will be provided to Google Fit.
 */
router.get("/mergedData", isAuthenticated, hasTokens, async (req, res, next) => {
    if (!req.query.tz) { req.query.tz = "utc" }
    const reqCopyForDexcom = Object.assign({}, req);

    const fitData = await (fitReq(req));

    reqCopyForDexcom.query.start = getTimestampForDexcom(req.query.start);
    reqCopyForDexcom.query.end = getTimestampForDexcom(req.query.end);

    const dexcomData = await (dexReq(reqCopyForDexcom));


    res.json({
        data: dexcomData.data.map((dexPt, idx) => {
            return {
                timestamp: dexPt.timestamp,
                egv: dexPt.value,
                heartPoints: fitData.data[idx].value
            };
        })
    })
});

module.exports = router;
