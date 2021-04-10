const fetch = require('node-fetch');

function fitReq(req) {
  fetch('https://fitness.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
          method: 'post',
          body:    getBody(req.query),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + req.user.googleAccessToken
          },
      })
      .then(res => res.json())
      .then(json => console.log(json));
}

var body = {
  "aggregateBy": [{
    "dataTypeName": "com.google.heart_minutes"
    //"dataSourceId": "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes"
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
