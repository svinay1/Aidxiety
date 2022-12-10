var clientId = '460722860159-uta1og28o9267laji61pcgtf97uj7qfh.apps.googleusercontent.com';
var apiKey = 'AIzaSyDtlkYq0dttRxaNPTH3isHJvgQfyOXkQbU';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
  console.log("Inside handleClientLoad ...");
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,100);
}

function checkAuth() {
  console.log("Inside checkAuth ...");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, 
                      handleAuthResult);
}

var authData;
function handleAuthResult(authResult) {
    console.log("Inside handleAuthResult ...");
    authData = authResult;
    var authorizeButton = document.getElementById('login-btn');
    var addButton = document.getElementById('addToCalendar');
    if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          addButton.style.visibility = 'visible'; 
          gapi.client.load('calendar', 'v3', function(){ 
            console.log("Calendar loaded.");
          });
    } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
}

function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, 
                        handleAuthResult);
    return false;
}
var addButton = document.getElementById('addToCalendar');
addButton.onclick = function(){
  var userChoices = getUserInput();
  console.log(userChoices);
  if (userChoices) 
    createEvent(userChoices);
}

function getUserInput(){
  
  var date = document.querySelector("#date").value;
  var startTime = document.querySelector("#start").value;
  var endTime = document.querySelector("#end").value;
  var eventDesc = document.querySelector("#event").value;
    if (date=="" || startTime=="" || endTime=="" || eventDesc==""){
    alert("All the fields are required.");
    return
  }
  else return {'date': date, 'startTime': startTime, 'endTime': endTime,
               'eventTitle': eventDesc}
}
function createEvent(eventData) {
    var resource = {
        "summary": eventData.eventTitle,
        "start": {
          "dateTime": new Date(eventData.date + " " + eventData.startTime).toISOString()
        },
        "end": {
          "dateTime": new Date(eventData.date + " " + eventData.endTime).toISOString()
          }
        };
    var request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': resource
    });
      request.execute(function(resp) {
      console.log(resp);
      alert("Success!");
    });
}