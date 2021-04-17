const fetch = require('node-fetch');
const { refreshDexcomToken } = require('../auth/strategies/dexcom');

async function dexReq(req) {
  try {
    let response = await tryFetch(req);
    if (response === 401) {
      await refreshDexcomToken(req.user);
      response = await tryFetch(req);
    }
    if (response === 401) {
      return { 'error': 'unauthorized' };
    }
    const json = await response.json();
    return parseData(json);
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function tryFetch(req) {
  const response = await fetchDex(req);
  const { status } = response;
  if (status === 401) {
    return status;
  }
  return response;
}

async function fetchDex(req) {
  return fetch(`https://sandbox-api.dexcom.com/v2/users/self/egvs?startDate=${req.query.start}&endDate=${req.query.end}`, {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + req.user.dexcomAccessToken
    },
  })
}

function parseData(json) {
  var ret = { 'data': [] };

  json.egvs.map(function(val) {
    ret.data.push({
      'timestamp': new Date(val.systemTime).toISOString(),
      'value': val.value ? val.value : null
    });
  });

  return ret;
}

module.exports = dexReq;
