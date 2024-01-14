const jwt = require("jsonwebtoken");


const checkAuth = (req, res, next)=> {
    try {
        const auth = req.headers.authorization
        if (!auth) {
            res.status(400).json({
                message: "Could not find Authorization headers!"
            })
        }
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = decodedToken.user;
        if (req.user === user) {
            next();
        }
        else {
            res.status(401).json({
                message: "Unauthorized access, couldn't verify Token"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "Couldn't authenticate at this time"
        })
    }
}

module.exports = checkAuth;