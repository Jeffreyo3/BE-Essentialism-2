/* 
  Middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');

// root directory needs a .env file with a key of SECRET for this function to work.
module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (req.decodedJWT) {
        next();
    } else if (token) {
        jwt.verify(token, process.env.SECRET, (err, decodedJWT) => {
            if (err) {
                res.status(401).json({ message: "Incorrect password." });
            } else {
                req.decodedJWT = decodedJWT;
                next();
            }
        });
    } else {
        res.status(401).json({ message: "Please login to get access to this." });
    }
};