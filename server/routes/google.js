const fetch = require('node-fetch');
const { DateTime } = require("luxon");

async function fitReq(req) {
  try {
    const response = await fetch('https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'post',
      body:    getBody(req.query),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + req.user.googleAccessToken
      },
    })
    const json = await response.json();
    return parseData(json, req.query.tz);
  } catch (error) {
    console.log(error);
    return {};
  }
}

const body = {
  "aggregateBy": [{
    "dataTypeName": "com.google.heart_minutes"
  }],
  "bucketByTime": { "durationMillis": 300000 }, // five minutes
  "startTimeMillis": 0,
  "endTimeMillis": 0
}

function getBody(query) {
  const start = DateTime.fromISO(query.start).toMillis();
  const end = DateTime.fromISO(query.end).toMillis();

  body.startTimeMillis = start;
  body.endTimeMillis = end;

  return JSON.stringify(body);
}

function parseData(json, tz) {
  var ret = { 'data': [] };
  json.bucket.map(function(val) {
    ret.data.push({
      'periodStart': DateTime.fromMillis(Number(val.startTimeMillis)).setZone(tz),
      'periodEnd': DateTime.fromMillis(Number(val.endTimeMillis)).setZone(tz),
      'timestamp': avgTimestamp(val.startTimeMillis, val.endTimeMillis, tz),
      'value': val.dataset[0].point[0] ? val.dataset[0].point[0].value[0].fpVal : 0
    });
  });

  return ret;
}

function avgTimestamp(startMillis, endMillis, tz) {
  const date =  DateTime.fromMillis((Number(startMillis) + Number(endMillis)) / 2, { zone: tz});
  return date.toString();
}

module.exports = fitReq;
