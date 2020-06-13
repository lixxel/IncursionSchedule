/**
 * Sends a POST (In this case, Discord webhook) to announce WoW BfA incursions AKA assaults.
 * 
 * 
 *
 * @author Steph AKA Lixx.
 * @link https://github.com/stephannapolis GitHub
 */


/*
LIVE
*/

POST_URL = "";
//roleID = "";

/*
TEST
POST_URL is the webhook URL. https://support.discordapp.com/hc/en-us/articles/228383668-Intro-to-Webhooks
*/

//POST_URL = "";
//roleID = ""; //find roleID by typing \@Role_Name. Will be in format <@&##################>


daylightSavings = 1; // 1 if spring-fall, 0 if fall-spring
timeZone = -8 + daylightSavings; // Server time zone offset
localTimeZone = -5 + daylightSavings;

fullCycleHours = 19; // Number of hours from the beginning of one invasion to the beginning of the next invasion
invasionUpHours = 7; // Number of hours the invasion is up each time

epochOffset = 3600; // Calculated by taking [one valid start time epoch timestamp] % cycleTime

incursionZone = ["Drustvar", "Zuldazar", "Tirigarde Sound", "Nazmir", "Stormsong Valley", "Vol'dun"];

function incursionTimer() {
  var d = new Date();
  var timeStamp = d.getTime()/1000;  // Number of sec since Jan 1, 1970
  secHour = 3600; //seconds per hour
  p = secHour * 1000; //ms per hour
  cycleTime = fullCycleHours * secHour; // seconds per cycle
  numberOfZones = incursionZone.length;

  invasionDownHours = fullCycleHours - invasionUpHours;
  
  
  var zoneID = 0;
  
  /*
  INVASION IN ONE HOUR
  */
  if ((epochOffset-900-secHour)%cycleTime<timeStamp%cycleTime && timeStamp%cycleTime<(epochOffset+900-secHour)%cycleTime){ //if between 1.25 before and 45 before
    zoneID = Math.round((timeStamp%(numberOfZones*cycleTime)-(epochOffset-secHour))/cycleTime);
    var options = {
      "method": "post",
      "headers": {
        "Content-Type": "application/json",
      },
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
  /*
  INVASION IS UP
  */
  else if ((epochOffset-900)%cycleTime<timeStamp%cycleTime && timeStamp%cycleTime<(epochOffset+900)%cycleTime){ //if between 15 before and 15 after
    zoneID = Math.round((timeStamp%(numberOfZones*cycleTime)-epochOffset)/cycleTime);
    
    localOffset = d.getTimezoneOffset() * 60000;
    serverOffset = timeZone * p;
    date = new Date(Math.round(d.getTime()/p+invasionUpHours)*p + localOffset + serverOffset); //invasionUp hours from now, start of next invasion
    estDate = new Date(date.getTime());
    estDate.setHours(estDate.getHours() - timeZone + localTimeZone);
    estDateString = estDate.toLocaleTimeString();
    estIncursionTime = estDateString.slice(0,-10) + " " + estDateString.slice(-6,-4);
    dateString = date.toLocaleTimeString();
    var nextIncursionTime = dateString.slice(0,-10) + " " + dateString.slice(-6,-4);
    
    var options = {
      "method": "post",
      "headers": {
        "Content-Type": "application/json",
      },
      "payload": JSON.stringify({
        //"content" : roleID,
        "embeds": [{
          "title": "Incursion is up!",
          "description": "Location: **"+ incursionZone[zoneID] +"**, ending at " + nextIncursionTime + " server (" + estIncursionTime + " EST)."
                   }]
      })
    };

    UrlFetchApp.fetch(POST_URL, options);
  }
  /*
  INVASION ENDED
  */
  else if ((epochOffset-900+(invasionUpHours*secHour))%cycleTime<timeStamp%cycleTime && timeStamp%cycleTime<(epochOffset+900+(invasionUpHours*secHour))%cycleTime){ //if between 15 before and 15 after end of invasion
    zoneID = Math.round(((timeStamp+invasionDownHours*secHour)%(numberOfZones*cycleTime)-epochOffset)/cycleTime);
    
    localOffset = d.getTimezoneOffset() * 60000;
    serverOffset = timeZone * p;
    date = new Date(Math.round(d.getTime()/p+invasionDownHours)*p + localOffset + serverOffset); //invasionDownHours hours from now, end of invasion
    estDate = new Date(date.getTime());
    estDate.setHours(estDate.getHours() - timeZone + localTimeZone);
    estDateString = estDate.toLocaleTimeString();
    estIncursionTime = estDateString.slice(0,-10) + " " + estDateString.slice(-6,-4);
    dateString = date.toLocaleTimeString();
    var nextIncursionTime = dateString.slice(0,-10) + " " + dateString.slice(-6,-4);
    
    var options = {
      "method": "post",
      "headers": {
        "Content-Type": "application/json",
      },
      "payload": JSON.stringify({
        //"content" : roleID,
        "embeds": [{
          "title": "Incursion ended!",
          "description": "Next one will be at "+ nextIncursionTime +" server (" + estIncursionTime + " EST) in **"+ incursionZone[zoneID] +"**."
                   }]
      })
    };

    UrlFetchApp.fetch(POST_URL, options);
  }

  
}

function createIncursionTrigger(){
  ScriptApp.newTrigger("incursionTimer")
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
