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
    return response.json();
  } catch (error) {
    console.log(error.response.body);
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

module.exports = fitReq;
