import joi from 'joi';

const transactionSchema = joi.object({
    title: joi.string().required(),
    value: joi.number().required()
});

export default transactionSchema;