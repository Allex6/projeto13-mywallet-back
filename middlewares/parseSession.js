import getToken from "../utils/getToken.js";
import { db } from './../db/mongo.js';

export default async function(req, res, next){

    const authorization = req.headers['authorization'];
    const token = getToken(authorization);
    const sessionsCollection = db.collection('sessions');
    const { userId } = await sessionsCollection.findOne({ token });
    if(!req.session) req.session = {};
    req.session.userId = userId;
    next();

};