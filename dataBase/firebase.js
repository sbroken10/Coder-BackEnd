let admin = require("firebase-admin");
let serviceAccount = require("../coderhouse-backend-ce73f-firebase-adminsdk-s4j8u-a31955b3eb.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

module.exports = {
    admin
}