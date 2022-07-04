import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import userSchema from './../schemas/userSchema.js';
import handleJoiErrors from './../utils/handleJoiErrors.js';

async function register(req, res, next){

    const { name, email, password, confirmPassword } = req.body;

    const { error } = userSchema.validate({
        name,
        email,
        password,
        confirmPassword
    });

    if(error){
        const errorMessages = handleJoiErrors(error);
        return res.status(409).send(errorMessages);
    }

    try {

        const usersCollection = req.db.collection('users');

        const findResult = await usersCollection.findOne({ email });

        if(findResult){
            return res.status(409).send('Esse email já está em uso.');
        }
        
        const hashedPassword = await bcrypt.hash(password, 14);

        await usersCollection.insertOne({
            name,
            email,
            password: hashedPassword
        });

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

}

async function login(req, res, next){

    const { email, password } = req.body;

    try {
        
        const usersCollection = req.db.collection('users');
        const sessionsCollection = req.db.collection('sessions');
        const defaultMessage = 'Verifique se digitou email e senha corretos.';

        const user = await usersCollection.findOne({ email });
        if(!user) return res.status(400).send(defaultMessage);

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).send(defaultMessage);

        const token = uuid();

        await sessionsCollection.insertOne({ token, userId: user._id });

        res.status(200).send({ token });

    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }

}

export {
    register,
    login
};