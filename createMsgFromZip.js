var schools = require('./converted.json');
var zipcodes = require('./zipcode-locations.json');
var geolib = require('geolib')
var toTwilioText = require('./createTwilioText.js');


// // Export variable when we reach our callback conditon.
// var list = retrieveSchoolList('92602', function(list) {
//   console.log(list);
// });

var createMsg =  function retrieveSchoolList(zipKey) {
  var lat = null;
  var lon = null;
  var schoolList = [];

  // NOTE: There may some issues with node's async nature here if the above search is slow!
  // Check if the user input zip matches from the list of zips we have.
  for(var zip in zipcodes) {
    // We found a match! Extract the lat/lon now.
    if(zip == zipKey) {
      lat = zipcodes[zip][0]
      lon = zipcodes[zip][1]
      break;
    }
  }

  // That zip code couldn't be found from our master list.
  if(lat == null || lon == null)
    return toTwilioText([])

  console.log(lat);
  console.log(lon);

  var MAX_RETURNED_SCHOOLS = 10;
  var COUNTER_MULTIPLE = 1;
  var RADIUS_BASE = 16100;
  var radius = RADIUS_BASE;

  while(schoolList.length < 1 || COUNTER_MULTIPLE < MAX_RETURNED_SCHOOLS) {
    // Cycle through list of schools
    radius = RADIUS_BASE * COUNTER_MULTIPLE;

    for(var i = 0; i < schools.length; i++) {

      if(schoolList.length >= MAX_RETURNED_SCHOOLS)
        break;

      // Callback when we have exhausted our list.
      if(i == schools.length - 1)
        break;
      var obj = schools[i];
      var addr = obj.Address;
      var inst = obj.Institution;
      var schoolLat = obj.Latitude;
      var schoolLon = obj.Longitude;

      // Lets check if this school is in the radius of that lat/lon found above from the zipcode.
      var isInCircle = geolib.isPointInCircle({latitude: schoolLat, longitude: schoolLon},
                                              {latitude: lat, longitude: lon},
                                              radius
      );
      // If its in the circle, lets add it to our list.
      if(isInCircle && !(schoolList.includes(inst))){
        schoolList.push(inst)
      }
    }
    
    COUNTER_MULTIPLE++;
  }
  return toTwilioText(schoolList);
}

module.exports = createMsg;
