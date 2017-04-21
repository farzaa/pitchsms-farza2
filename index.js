
// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
// var list = require('./parse.js');

// var schools = list('67846', function(list) {
//   console.log(list);
// });


//var createMsg = require('./createMsgFromZip.js');

// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
//
// var createMsg = require('./createMsgFromZip.js');


// var accountSid = 'AC87b63e9e453fc85755fa9a7271117763'; // Your Account SID from www.twilio.com/console
// var authToken = '510cd92cc4d94598f4f2ded16b1f282f';   // Your Auth Token from www.twilio.com/console
// var sendingNumber = '+13234524193';

// var twilio = require('twilio');
// const notifyOnError = require('./twilioNotifcations');
// var client = new twilio.RestClient(accountSid, authToken);

// var client = require('./twilioClient');
//
// app.set('port', (process.env.PORT || 5000));
//
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(__dirname + '/public'));

// Mount middleware to notify Twilio of errors

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
//
// app.post('/sms', function(request, response) {
//   var zip = request.body.Body;
//   var msg = createMsg(zip);
//   client.sendSms(request.body.From, msg);
  // console.log(msg);
  // var twiml = new twilio.TwimlResponse();
  // twiml.message(msg);
  // res.writeHead(200, {'Content-Type': 'text/xml'});
  // res.end(twiml.toString());
// });
// TEST CASES
// let zip = '91108';
// let msg = createMsg(zip);
// console.log(zip);
// console.log(msg);
// zip = '82642'
// msg = createMsg(zip);
// console.log(zip);
// console.log(msg);

var http = require('http');
var express = require('express');
var twilio = require('twilio');
var msg = require('./createMsgFromZip.js');
const bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser());

console.log(msg('33028'));

app.post('/sms', function(req, res) {
  console.log(req.body);
  const twiml = new twilio.TwimlResponse();
  if(req.body.Body != null) {
    var zip = req.body.Body;
    var text = msg(zip.toString());
    twiml.message(text);
    console.log(text);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
  else {
    twiml.message('Error');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});