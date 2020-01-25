function appendKeys(url) {
  const appKey = process.env.REACT_APP_TRANSPORT_API_APP_KEY;
  const appId = process.env.REACT_APP_TRANSPORT_API_APP_ID;

  if (appKey && appId) {
    url += "?app_key=" + appKey + "&app_id=" + appId;
  }
  return url;
}

export function getApiUrl(partialUrl) {
  var fullUrl = process.env.REACT_APP_TRANSPORT_API_URL + partialUrl;
  return appendKeys(fullUrl);
}
