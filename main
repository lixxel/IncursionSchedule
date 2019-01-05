
//POST_URL is the webhook URL. If you're using discord, follow this: https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks
var POST_URL = "";
var roleID = ""; //find roleID by typing \@Role_Name. Will be in format <@&##################>

var incursionZone = ["Drustvar", "Zuldazar", "Tirigarde Sound", "Nazmir", "Stormsong Valley", "Vol'dun"];

function myFunction() {
  var d = new Date();
  var timeStamp = d.getTime()/1000;  // Number of sec since Jan 1, 1970
  p = 60 * 60 * 1000; //ms per hour
  
  var zoneID = 0;
  
  if (67500<timeStamp%68400 || timeStamp%68400<900){ //if between 15 before epoch and 15 after epoch
    zoneID = Math.round((timeStamp%410400)/68400);
    var options = {
      "method": "post",
      "payload": JSON.stringify({
        //"content" : roleID,
        "embeds": [{
          "title": "Incursion in one hour...",
          "description": "Location: **"+ incursionZone[zoneID] +"**"
                   }]
      })
    };

    UrlFetchApp.fetch(POST_URL, options);
  }
  else if (2700<timeStamp%68400 && timeStamp%68400<4500){ //if between 45 after epoch and 1.25 after epoch
    zoneID = Math.round(((timeStamp%410400)-3600)/68400);
    
    localOffset = d.getTimezoneOffset() * 60000;
    serverOffset = -4 * p;
    date = new Date(Math.round(d.getTime()/p+7)*p + localOffset + serverOffset); //7 hours from now  
    dateString = date.toLocaleTimeString();
    var nextIncursionTime = dateString.slice(0,-10) + " " + dateString.slice(8,10);
    
    var options = {
      "method": "post",
      "payload": JSON.stringify({
        //"content" : roleID,
        "embeds": [{
          "title": "Incursion is up!",
          "description": "Location: **"+ incursionZone[zoneID] +"**, ending at " + nextIncursionTime + " server."
                   }]
      })
    };

    UrlFetchApp.fetch(POST_URL, options);
  }
  else if (27900<timeStamp%68400 && timeStamp%68400<29700){ //if between 7.75 after epoch and 8.25 after epoch
    zoneID = Math.round(((timeStamp+39600)%410400)/68400);
    
    localOffset = d.getTimezoneOffset() * 60000;
    serverOffset = -4 * p;
    date = new Date(Math.round(d.getTime()/p+12)*p + localOffset + serverOffset); //12 hours from now  
    dateString = date.toLocaleTimeString();
    var nextIncursionTime = dateString.slice(0,-10) + " " + dateString.slice(8,10);
    
    var options = {
      "method": "post",
      "payload": JSON.stringify({
        //"content" : roleID,
        "embeds": [{
          "title": "Incursion ended!",
          "description": "Next one will be at "+ nextIncursionTime +" server in **"+ incursionZone[zoneID] +"**."
                   }]
      })
    };

    UrlFetchApp.fetch(POST_URL, options);
  }

  
}

function createTrigger(){
  ScriptApp.newTrigger("myFunction")
    .timeBased()
    .everyHours(1).nearMinute(0)
    .create(); 
}
function deleteTrigger() {
  
  // Loop over all triggers and delete them
  var allTriggers = ScriptApp.getProjectTriggers();
  
  for (var i = 0; i < allTriggers.length; i++) {
    ScriptApp.deleteTrigger(allTriggers[i]);
  }
}
