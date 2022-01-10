const nodeMailer = require('nodemailer');
const dotenv = require('dotenv').config();

const transporterGmail = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});
module.exports = {
    transporterGmail
}