const accountSid ='AC9ba9103046072960a98572d599525339';
const authToken ='69c7e160c0e46d424b6be212ea5efd2b';

const sms = require('twilio')(accountSid, authToken);

module.exports = {sms};

