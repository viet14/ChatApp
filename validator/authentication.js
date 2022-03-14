import Joi from "joi"


const schemas = {
    signUp: Joi.object().keys({
        firstName : Joi.string().min(3).max(15).required(),
        lastName : Joi.string().min(3).max(15).required(),
        dateOfBirth : Joi.date().raw().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    })
}

export {schemas}