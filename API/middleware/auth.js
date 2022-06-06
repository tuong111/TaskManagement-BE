const jwt = require('jsonwebtoken');

const middlewareAuth = {
    verifyToken : (req,res,next) => {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1]
    
        if (!token){
            return res.status(401).json({
                success: false,
                message: 'Access token not found'
            })
        }
    
        try {
            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
            req.userID = decoded.userID
            req.isAdmin = decoded.isAdmin
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({
                success : false,
                message : 'Invalid access token'
            })
        }
    },
    verifyTokenAndAdminAuth : (req,res,next) => {
        middlewareAuth.verifyToken(req,res, ()=> {
            if (req.userID === req.params.id || req.isAdmin){
                next()
            }else {
                res.status(403).json("You are not allowed to process this action")
            }
        })
    }
}


module.exports = middlewareAuth;