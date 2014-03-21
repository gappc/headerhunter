chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    console.log(details.responseHeaders);
  },
  {urls: ["<all_urls>"]}, ["responseHeaders"]
);
