const fetch = require('node-fetch');

async function dexReq(req) {
  try {
    const response = await fetch(`https://sandbox-api.dexcom.com/v2/users/self/egvs?startDate=${req.query.start}&endDate=${req.query.end}`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + req.user.dexcomAccessToken
      },
    })
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.response.body);
  }
}

module.exports = dexReq;
