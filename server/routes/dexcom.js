const fetch = require('node-fetch');
const { refreshDexcomToken } = require('../auth/strategies/dexcom');
const { DateTime } = require("luxon");

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
    return parseData(json, req.query.tz);
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

function parseData(json, tz) {
  var ret = { 'data': [] };
  json.egvs.map(function(val) {
    const timestamp = new Date(val.systemTime);
    ret.data.push({
      'timestamp': DateTime.fromISO(val.systemTime, { zone: "utc" }).setZone(tz).toString(),
      'timestampValue': timestamp.getTime(),
      'value': val.value ? val.value : null
    });
  });

  ret.data = ret.data.sort((a, b) => a.timestampValue - b.timestampValue)

  return ret;
}

module.exports = dexReq;
