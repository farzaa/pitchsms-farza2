var toTwilioText = function(list) {
  if(list.length >= 1) {
    var baseMsg = "EsportsEDU schools around you! "
    var newMsg = baseMsg;
    newMsg += list[0];
    for(var i = 1; i < list.length; i++) {
      newMsg += ", " + list[i];
    }
    if(list.length > 10) {
      newMsg += ", and a few others!";
    } else {
      newMsg += "!";
    }
    return newMsg;
  } else {
    //
    //
    return "Unfortunately there aren't any schools around your zip :(";
  }
}

module.exports = toTwilioText;
