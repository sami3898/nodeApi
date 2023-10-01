const User = require("../model/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Route to create user
const createUser = async (req, res) => {

    try {

        bcryptjs.hash(req.body.password, 10)
        .then(async hashPassword => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            })
            
            const result = await user.save()
            if (result) {
                res.status(200).json({
                    message: "User created successfully",
                    user: result
                })
            } else {
                res.status(400).json({
                    message: "Something went wrong"
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                message: "Password not hashed successfully"
            })
        })

        
    } catch (error) {
        res.send(error)
    }
    
}

// Route to login user
const loginUser = async (req,res) => {
    try {
        User.findOne({ email: req.body.email })
        .then(user => {
            console.log(user)
            bcryptjs.compare(req.body.password,user.password)
            .then(passwordCheck => {
                if (!passwordCheck) {
                    res.status(400).json({
                        message: "Password does not match"
                    })
                }

                // Create token
                const token = jwt.sign(
                    {
                        userId: user._id,
                        userEmail: user.email
                    },
                    "RANDOM-TOKEN",
                    { expiresIn: "24h" }
                )

                res.status(200).json({
                    message: "user login successfully",
                    user,
                    token
                })
            })
            
        })
        .catch(error => {
            res.status(400).json({
                message: "Email does not exist"
            })
        })
    } catch (error) {
        res.send(error)
    }
}

module.exports = { createUser, loginUser }; 