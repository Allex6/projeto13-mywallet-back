import getToken from "../utils/getToken.js";

export default async function(req, res, next){

    const authorization = req.headers['authorization'];
    const token = getToken(authorization);
    const sessionsCollection = req.db.collection('sessions');
    const { userId } = await sessionsCollection.findOne({ token });
    if(!req.session) req.session = {};
    req.session.userId = userId;
    next();

};