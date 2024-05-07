const { Router } = require('express')
const User = require('../dao/models/user')
const { isValidPassword } = require('../utils/hashing')
const { generateToken, verifyToken } = require('../utils/jwt')
const passportMiddleware = require('../utils/passportMiddleware')
const authorizationMiddleware = require('../utils/authorizationMiddleware')

const router = Router()

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send('Invalid credentials!')
    }
    
    let user
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        // Datos de sesión para el usuario coder Admin
        user = {                    
            first_name: "Usuario",
            last_name: "de CODER", 
            age: 21,
            email: "adminCoder@coder.com",  
            cart: "",                    
            rol: "admin",
            _id: "jhhasgñjglsargj355ljasg"
        }        
    }
    else {
        user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'User not found!' })
        }
    
        if (!isValidPassword(password, user.password)) {
            return res.status(401).json({ error: 'Invalid password' })
        }
    }   

    const credentials = { id: user._id.toString(), email: user.email, rol: 'user' }
    const accessToken = generateToken(credentials)
    res.cookie('accessToken', accessToken, { maxAge: 60 * 1000, httpOnly: true })

    res.status(200).json({ accessToken })
})

router.get('/private', verifyToken, (req, res) => {
    const { email } = req.authUser
    res.send(`Welcome ${email}, this is private and protected content`)
})

router.get('/current', passportMiddleware('jwt'), authorizationMiddleware('user'), async (req, res) => { 
    return res.json(req.user)    
})

module.exports = router