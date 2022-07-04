import getToken from "../utils/getToken.js";

export default async function(req, res, next){

    const authorization = req.headers['authorization'];
    if(!authorization) return res.sendStatus(401);

    const token = getToken(authorization);
    if(!token) return res.sendStatus(401);

    const sessionsCollection = req.db.collection('sessions');
    const findResult = await sessionsCollection.findOne({ token });
    if(!findResult) return res.sendStatus(401);

    if(!req.session) req.session = {};
    req.session.userId = findResult.userId;
    next();

};