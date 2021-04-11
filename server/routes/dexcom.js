const fetch = require('node-fetch');
const { refreshDexcomToken } = require('../auth/strategies/dexcom');

async function dexReq(req) {
  try {
    const response = await fetch(`https://sandbox-api.dexcom.com/v2/users/self/egvs?startDate=${req.query.start}&endDate=${req.query.end}`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + req.user.dexcomAccessToken
      },
    })
    const { status } = response;
    if (status === 401) {
      await refreshDexcomToken();
    }
    return response.json();
  } catch (error) {
    console.log(error.response.body);
    return {};
  }
}

module.exports = dexReq;
