var schools = require('./converted.json');
var zipcodes = require('./zipcode-locations.json');
var geolib = require('geolib')

var list =  function retrieveSchoolList(zipKey, callback) {
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
  if(lat == null || lon == null) {
    callback(schoolList)
    return;
  }

  findSchoolsInRadius(lat, lon, 16100, function(list) {

    // Lets return our final list as long as we have one school to show for.
    if(list.length >= 1) {
      callback(list);
      return;
    }

    // If we stil haven't found a school in the area, lets expand our search.
    if(list.length == 0) {
      findSchoolsInRadius(lat, lon, 32000, function(listTwo) {
        if(listTwo.length >= 1) {
          callback(listTwo);
          return;
        }
        
        // Nothing found in the area. Just callback empty list.
        else {
          callback(listTwo);
          return;
        }
      });
    }
  });
}


function findSchoolsInRadius(lat, lon, radius, callback) {

  var schoolList = [];

  // Cycle through list of schools
  for(var i = 0; i < schools.length; i++) {

    // Callback when we have exhausted our list.
    if(i == schools.length - 1) {
      callback(schoolList);
      return;
    }

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
    if(isInCircle)
      schoolList.push(inst)

    // If our school list has 5 elements, that is more than enough. Callback.
    if(schoolList.length == 5) { 
      callback(schoolList);
      return;
    }

  }
}

module.exports = list;