const jwt = require('jsonwebtoken');

const AuthReq = function (req, res, next) {
    try {
        if (req.headers.authorization !== undefined) {
            const authorization = req.headers.authorization;
            const assess_token = authorization.replace('Bearer ', '', authorization);
            const decoded = jwt.verify(assess_token, process.env.JWT_SECRET);
            req.body['auth'] = decoded;
            next()
        } else {
            res.status(401).send({error: 'Unauthorized Request!'});
        }
    } catch (e) {
        res.status(401).send({error: 'Unauthorized Request!'});
    }
}

module.exports = AuthReq;