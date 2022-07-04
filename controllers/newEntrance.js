import dayjs from 'dayjs';
import transactionSchema from "../schemas/transactionSchema.js";
import handleJoiErrors from './../utils/handleJoiErrors.js';

export default async function(req, res, next){

    const { title, value } = req.body;
    const { error } = transactionSchema.validate({ title, value });

    if(error){
        const messages = handleJoiErrors(error);
        return res.status(400).send(messages);
    }

    try {
        
        const { userId } = req.session;
        const date = dayjs().format('DD/MM/YYYY');

        const transactionData = {
            title,
            value,
            date,
            type: 'entrance',
            userId
        };

        const transactionsCollection = req.db.collection('transactions');
        await transactionsCollection.insertOne(transactionData);

        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

};