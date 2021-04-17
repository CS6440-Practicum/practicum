const fetch = require('node-fetch');
const { refreshDexcomToken } = require('../auth/strategies/dexcom');

async function dexReq(req) {
  try {
    var response = await tryFetch(req);
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
  var response = await fetchDex(req);
  var { status } = response;
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

  for(let val of json.egvs) {
    ret.data.push({
      'timestamp': val.systemTime,
      'value': val.value ? val.value : null
    });
  }

  return ret;
}

module.exports = dexReq;
