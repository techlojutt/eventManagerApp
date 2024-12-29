const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');


const authMiddleware = async (req, res, next) => {

    try {
        console.log(req?.headers?.authorization,'req?.headers?.authorization');
        if(!req?.headers?.authorization){
            return res.status(401).json({
                data:[],
                message:"authorization is required",
                success:false,
            });
        }
        const token = req?.headers?.authorization
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
          data:[],
          message:"error in auth middleware",
          success:false,
          error:error,
        }  
        )
    }}



    module.exports = {
    authMiddleware,
};