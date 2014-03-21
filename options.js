function clearDomains() {
  chrome.storage.local.remove("hidden", function() {
    var status = document.getElementById('status');
    status.textContent = 'Domains cleared.';
    document.body.removeChild(document.getElementById("domain-blacklist"));
  });

}
function listDomains() {
  chrome.storage.local.get("hidden", function(hiddenObject) {
    var ul = document.getElementById("domain-blacklist");
    if(hiddenObject.hidden)
    {
      for(var key in hiddenObject.hidden)
      {
        var li = document.createElement('li');
        li.innerHTML = key;
      }
      ul.appendChild(li);
    }
    else
    {
      ul.appendChild(document.createTextNode("No domains..."))
    }
    
  });
}
document.addEventListener('DOMContentLoaded', listDomains);
document.getElementById('save').addEventListener('click', clearDomains);