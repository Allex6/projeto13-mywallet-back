export default async function(req, res, next){

    const { userId } = req.session;

    try {
        
        const transactionsCollection = req.db.collection('transactions');
        const transactions = await transactionsCollection.find({ userId }).toArray();
        res.status(200).send(transactions);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

};