const fetch = require('node-fetch');

function dexReq(req) {
  fetch(`https://sandbox-api.dexcom.com/v2/users/self/egvs?startDate=${req.query.start}&endDate=${req.query.end}`, {
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + req.user.dexcomAccessToken
          },
      })
      .then(res => res.json())
      .then(json => console.log(json));
}

module.exports = dexReq;
