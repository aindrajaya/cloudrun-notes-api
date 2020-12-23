const Validator = require('../helpers/validate');

const signup = async (req, res, next) => {
    const validationRule = {
        "email": "required|string|email|exist:User,email",
        "firstName": "required|string|exist:User,firstName",
        "lastName": "required|string|exist:User,lastName",
        "password": "required|string|min:6|confirmed|strict",
    }

    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    signup
};