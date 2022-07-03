import getToken from "../utils/getToken.js";
import { db } from './../db/mongo.js';

export default async function(req, res, next){

    const authorization = req.headers['authorization'];
    const token = getToken(authorization);

    try {
        
        const sessionsCollection = db.collection('sessions');
        await sessionsCollection.deleteOne({ token });
        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

};