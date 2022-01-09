const accountSid ='AC9ba9103046072960a98572d599525339';
const authToken ='e9956502b09d05f3ce6366aa4b56bb71';


const sms = require('twilio')(accountSid, authToken);

module.exports = {sms};

