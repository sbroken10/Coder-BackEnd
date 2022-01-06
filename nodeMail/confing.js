const nodeMailer = require('nodemailer');

const transporterEth = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'prince.yost86@ethereal.email',
        pass: '8wq5enK3UDCdU6T8a6'
    }
});
const transporterGmail = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'backendcoderapp@gmail.com',
        pass: 'coder1234*'
    }
});
module.exports = {
    transporterGmail,
    transporterEth
}