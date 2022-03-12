const Router = require('express')
const router = Router();
const bcrypt = require('bcryptjs')
const User = require('../../Models/User')

router.post('/register', async (req, res) => {
    try {
        const {email, password, name, sName, nickname} = req.body;
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message: 'Such an email already exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User(
            {email, password: hashedPassword, name, secondName: sName, nickname, isAdmin: false, betList: []}
        )

        await user.save();

        res.status(201).json({message: 'User created', user})

    } catch (e) {
        res.status(500).json({message: `Something sloamlos': ${e}`})
    }
})
router.post('/login', async (req, res) => {
    //console.log("/login");
    try {
        const {nickname, password} = req.body;

        const user = await User.findOne({nickname})
        if (!user) {
            return res.status(400).json({message: 'There is no such user'})
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({message: 'Invalid password'})
        }
        res.json({...user});
    } catch (e) {
        res.status(500).json({message: "Something sloamlos'"})
    }
})

module.exports = router;