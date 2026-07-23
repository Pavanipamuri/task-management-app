const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req, res, next) => {

    try {

        // Get token from header
        const token = req.headers.authorization;


        if (!token) {

            return res.status(401).json({
                message: "No token provided. Access denied"
            });

        }


        // Remove Bearer text
        const jwtToken = token.split(" ")[1];


        // Verify token
        const decoded = jwt.verify(
            jwtToken,
            process.env.JWT_SECRET
        );


        // Find user
        req.user = await User.findById(
            decoded.id
        ).select("-password");


        if (!req.user) {

            return res.status(404).json({
                message:"User not found"
            });

        }


        next();


    } catch(error) {


        res.status(401).json({

            message:"Invalid token"

        });


    }

};


module.exports = protect;
