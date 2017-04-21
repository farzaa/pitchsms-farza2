var cfg = {};


cfg.accountSid = 'AC87b63e9e453fc85755fa9a7271117763';
cfg.authToken = '510cd92cc4d94598f4f2ded16b1f282f';
cfg.sendingNumber = '+13234524193';

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}
module.exports = cfg;