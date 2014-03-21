var hdrs = ["X-Recruiting", "X-Hacker", "X-PickUsInstead", "X-Awesome", "X-Geek", "X-Jobs", "X-Hire"];
var tabHeaders = {};

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    if(details.type == 'main_frame')
    {
      tabHeaders[details.tabId] = [];
      for(var key in details.responseHeaders)
      {
        if(hdrs.indexOf(details.responseHeaders[key].name) != -1) tabHeaders[details.tabId].push(details.responseHeaders[key]);
      }
    }
  },
  {urls: ["<all_urls>"]}, ["responseHeaders"]
);

chrome.extension.onMessage.addListener(function(message, sender, sendResponse){
  if(message.type == "headerhunter" && sender.tab)
  {
    sendResponse({type:"headerhunter", headers:tabHeaders[sender.tab.id]});
  }
});
