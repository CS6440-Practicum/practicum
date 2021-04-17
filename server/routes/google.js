const fetch = require('node-fetch');

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
    return parseData(json);
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
  var start = new Date(query.start).getTime();
  var end = new Date(query.end).getTime();
  body.startTimeMillis = start;
  body.endTimeMillis = end;

  return JSON.stringify(body);
}

function parseData(json) {
  var ret = { 'data': [] };

  for(let val of json.bucket) {
    ret.data.push({
      'timestamp': avgTimestamp(val.startTimeMillis, val.endTimeMillis),
      'value': val.dataset[0].point[0] ? val.dataset[0].point[0].value[0].fpVal : 0
    });
  }

  return ret;
}

function avgTimestamp(startMillis, endMillis) {
  const date = new Date((Number(startMillis) + Number(endMillis)) / 2);
  return date.toISOString();
}

module.exports = fitReq;
