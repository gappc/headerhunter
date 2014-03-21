var alertBox;

function newEl(elType, options)
{
  var el = document.createElement(elType);
  if(options.innerHTML) el.innerHTML = options.innerHTML;
  if(options.text) el.appendChild(document.createTextNode(options.text));
  if(options.className) el.className = options.className;
  return el;
}

chrome.extension.sendMessage({type:"headerhunter"}, function(response){
  if(response.type == "headerhunter" && response.headers.length > 0)
  {
    chrome.storage.local.get("hidden", function(hiddenObject) {
      
      if(!hiddenObject.hidden) hiddenObject.hidden = {};

      var currentHost = window.location.host;

      if(!hiddenObject.hidden[currentHost])
      {
        // create alertbox
        alertBox = newEl('div', { className : 'headerhunter-alert'});
        alertBox.appendChild(newEl('h3', { text : "Recruitment Header Detected"}));

        // add header items
        for(var key in response.headers)
        {
          var child = newEl('div', { 
            className : 'headerhunter-item', 
            innerHTML : "<span>" + response.headers[key].name + "</span>" + response.headers[key].value
          });
          alertBox.appendChild(child);
        }

        // add hide link
        var hide = newEl('a', { className : "headerhunter-hide", text : "Hide" });
        hide.href = "#";
        alertBox.appendChild(hide);

        hide.onclick = function(e) {
          e.preventDefault();
          document.body.removeChild(alertBox);
        }

        // add hide forever link
        var forever = newEl('a', { className : "headerhunter-forever", text : "Hide Forever" });
        forever.href = "#";
        alertBox.appendChild(forever);

        forever.onclick = function(e) {
          e.preventDefault();
          hiddenObject.hidden[currentHost] = true;
          chrome.storage.local.set(hiddenObject);
          document.body.removeChild(alertBox);
        }

        document.body.appendChild(alertBox);
      }
    });
  }
});