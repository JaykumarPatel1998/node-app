const jwt = require('jsonwebtoken');
const SECRET = 'secretkey'

function createJwtToken(user) {
    const token =   jwt.sign(
                        {
                            email : user.email,
                            userId : user._id
                        },
                        SECRET,
                        {
                            expiresIn: '2h'
                        }
                    )
    return token;
}

function AuthenticateUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decoded = jwt.verify(token, SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed!'
        })
    }
}

module.exports = {createJwtToken, AuthenticateUser};
    
