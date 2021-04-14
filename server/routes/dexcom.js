const fetch = require('node-fetch');
const { refreshDexcomToken } = require('../auth/strategies/dexcom');

async function dexReq(req) {
  try {
    var response = await fetchDex(req);
    const { status } = response;
    if (status) {
      await refreshDexcomToken(req.user);
      response = await fetchDex(req);
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function fetchDex(req) {
  return fetch(`https://sandbox-api.dexcom.com/v2/users/self/egvs?startDate=${req.query.start}&endDate=${req.query.end}`, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + req.user.dexcomAccessToken
    },
  })
}

module.exports = dexReq;
