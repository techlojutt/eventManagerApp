const bcrypt = require('bcryptjs');
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');





const registerController = async (req, res) => {
    // code here
     try{
            if(!req.body.name){
                return res.send({
                    message:"Name is required",
                });
            }
            if(!req.body.email){
                return res.send({
                    message:"Email is required",
                });
            }
            if(!req.body.password){
                return res.send({
                    message:"Password is required",
                });
            }
            
            const existingUser = await Users.findOne({email:req.body.email});
            if(existingUser){
                return res.status(200).json({
                    message:"User Already Exists please Login",
                });
            }

            var hashPassword = bcrypt.hashSync(req.body.password, 8);
            let  newUser =  new Users({
                name:req?.body?.name,
                email:req?.body?.email,
                password:hashPassword,
                imageURL :req?.body?.imageURL
            });

            const result = await newUser.save();
            res.status(200).json({
                data:result,
                message:"User Registered Successfully",
                success:true
            });

     }
     catch(error){
         console.log(error);
         res.status(500).json({
            data:[],
            message:"Error in Registering User",
            success:false,
            error,
         });
     }
};



const loginController = async (req, res) => {
      //code here
        try{
                if(!req.body.email){
                    return res.send({
                        message:"Email is required",
                    });
                }
                if(!req.body.password){
                    return res.send({
                        message:"Password is required",
                    });
                }
                const existingUser = await Users.findOne({email:req.body.email});
                if(!existingUser){
                    return res.status(200).json({
                        message:"User Not Found",
                    });
                }
                const isPasswordValid = bcrypt.compareSync(req.body.password, 
                    existingUser.password);
                if(!isPasswordValid){
                    return res.status(200).json({
                        message:"Invalid Password",
                    });
                }
                const token = jwt.sign({id:existingUser._id,email:existingUser.email,
                    name:existingUser.name},process.env.JWT_SECRET)
                
                res.status(200).json({
                    data:{
                        token:token,
                        name:existingUser.name,
                        email:existingUser.email,
                        phone:existingUser.phone,
                        address:existingUser.address,
                    },
                    message:"User Logged In Successfully",
                    success:true
                });
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                data:[],
                message:"Error in Logging In User",
                success:false,
                error,
            });
        }
};

const testController = (req, res) => {
    res.send("protected route");
};

module.exports = {
    registerController,
    loginController,
    testController
};
