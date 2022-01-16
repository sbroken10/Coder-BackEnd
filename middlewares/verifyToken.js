const logger = require('../winston/log-service')

function verifyToken (req, res, next){
    const bearerHeader=req.headers['authorization']
    if (typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.session.token = bearerToken;
        next();
    }else{
        res.sendStatus(403)
    }
}

module.exports = {
    verifyToken
}