const Router = require('express')
const router = Router();
const Lot = require('../../Models/Lot')
const User = require('../../Models/User')
const bcrypt = require('bcryptjs')

router.post('/changenickname', async (req, res) => {
    try {
        const {nickname, userId} = req.body;

        const user = await User.findOne({_id: userId})

        if (nickname !== user.nickname)
            user.nickname = nickname;

        user.save()

        res.status(200).json({message: 'Nickname changed'});
    } catch (e) {
        res.status(500).json({message: "Something sloamlos'" + e})
    }
})

router.post('/getuserdata', async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await User.findOne({_id: userId})

        res.status(200).json({user});
    } catch (e) {
        res.status(500).json({message: "Something sloamlos'" + e})
    }
})

router.post('/changemail', async (req, res) => {
    try {
        const {email, userId} = req.body;

        const user = await User.findOne({_id: userId})

        if (email !== user.email)
            user.email = email;
        user.save()

        res.status(200).json({message: 'email changed'});
    } catch (e) {
        res.status(500).json({message: "Something sloamlos'" + e})
    }
})

router.post('/changepassword', async (req, res) => {
    try {
        const {password, curPassword, userId} = req.body;

        const user = await User.findOne({_id: userId})

        const hashedNewPassword = await bcrypt.hash(password, 12);

        const isMatched = await bcrypt.compare(curPassword, user.password)
        const isMatchedNew = await bcrypt.compare(password, user.password)

        if (password !== '') {
            if (isMatched && !isMatchedNew)
                user.password = hashedNewPassword;
            else if (!isMatched)
                res.status(201).json({error: 'Incorrect current password'})
            else if (isMatchedNew)
                res.status(201).json({error: 'The password is the same as the current one'})
        }
        user.save()

        res.status(200).json({message: 'Password changed'});
    } catch (e) {
        res.status(500).json({message: `Something sloamlos' ${e}`})
    }
})

router.post('/betfind', async (req, res) => {
    try {
        const {id, uId} = req.body;
        const lot = await Lot.findOne({_id: id});
        const user = await User.findOne({_id: lot.lastBetOwner})

        res.status(200).json({
            lastBet: lot.lastBet,
            isWon: lot.lastBetOwner === uId,
            lastBetOwner: user.nickname,
            lotName: lot.name
        });
    } catch (e) {
        res.status(500).json({message: "Something sloamlos'" + e})
    }
})

router.post('/finduserlots', async (req, res) => {
    try {
        const {_id} = req.body;
        const lots = await Lot.find({creator: _id});

        res.status(200).json({lots});
    } catch (e) {
        res.status(500).json({message: "Something sloamlos'" + e})
    }
})

router.post('/finduserwins', async (req, res) => {
    try {
        const {_id} = req.body;
        const lots = await Lot.find({lastBetOwner: _id, isClosed: true});

        res.status(200).json({lots});
    } catch (e) {
        res.status(500).json({message: "Something sloamlos'" + e})
    }
})

module.exports = router;