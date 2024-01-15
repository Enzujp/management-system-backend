const jwt = require("jsonwebtoken");


const createToken = (id) => {
    jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: "1h"})
};


module.exports = createToken;