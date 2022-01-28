const dotenv = require('dotenv').config();

const sms = require('twilio')(process.env.ACCOUNTSID, process.env.AUTHTOKEN);

module.exports = {sms};

