const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const found = await Auth.findOne({ email: req.body.email })
        if (found) {
            res.status(400).json({ message: 'User already exists' })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
            await Auth.create(req.body)
            res.json({ message: 'User registered successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error server' })
    }
}

exports.login = async (req, res) => {
    try {
        const found = await Auth.findOne({ email: req.body.email })
        if (found) {
            const validPassword = bcrypt.compareSync(req.body.password, found.password);
            if (validPassword) {
                const payload = {
                    userId:found._id,
                    role:found.role
                }
                const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'})
                res.json({message:'Logged in successfully',token:token})
            }
            else{
                res.status(400).json({message:'Email or password incorrect'})
            }
        }else{
            res.status(400).json({message:'Email or password incorrect'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error server' })
    }
}