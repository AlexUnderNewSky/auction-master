const Router = require('express')
const router = Router();
const Lot = require('../../Models/Lot')
const User = require('../../Models/User')

router.post('/create', async (req, res) => {
    try {
        const {name, instantPrice, photos, creator, lastBet, lotInfo, sellerComment, category} = req.body;

        const lot = new Lot(
            {
                name,
                category,
                instantPrice,
                photos,
                creator,
                lastBet,
                lastBetOwner: '',
                lotInfo,
                sellerComment,
                date: Date.now(),
                isClosed: false
            }
        )
        await lot.save();

        res.status(201).json({message: 'Lot created'})

    } catch (e) {
        res.status(500).json({message: `Something sloamlos': ${e}`})
    }
})
router.post('/findall', async (req, res) => {
    const {lastBetLow, lastBetHigh, timeLeft, instantLow, instantHigh, category, search} = req.body.filters;
    let time;
    switch (timeLeft) {
        case 1: {
            time = 3600000;
            break;
        }
        case 2: {
            time = 86400000;
            break;
        }
        case 3: {
            time = 259200000;
            break;
        }
        case 4: {
            time = 86400000;
            break;
        }
        case 5: {
            time = 259200000;
            break;
        }
        default:
            time = 0;

    }
    try {

        const lots = await Lot.find({
            isClosed: false,
            lastBet: {
                $gte: lastBetLow ? parseInt(lastBetLow) : 0,
                $lte: lastBetHigh ? parseInt(lastBetHigh) : 10000000000,
            },
            instantPrice: {
                $gte: instantLow ? parseInt(instantLow) : 0,
                $lte: instantHigh ? parseInt(instantHigh) : 10000000000,
            },
            name: search !== '' ? {$regex: `${search}`, $options: "i"} : {$regex: ''},
            category: category !== -1 ? {$eq: category} : {$gte: 0}
        })

        let filterLots = [];
        lots.map((lot) => {
            if (timeLeft > 3 || timeLeft === -1) {
                if ((Date.parse(lot.date) + 604800000 - Date.now() - time) > 0)
                    filterLots.push(lot);
            } else if ((Date.parse(lot.date) + 604800000 - Date.now() - time) < 0)
                filterLots.push(lot);
        })

        res.status(201).json({lots: filterLots})
    } catch (e) {
        res.status(500).json({message: `Something sloamlos': ${e}`})
    }
})
router.post('/find', async (req, res) => {
    try {
        const lot = await Lot.findOne({_id: req.body.id});
        res.status(201).json({...lot})

    } catch (e) {
        res.status(500).json({message: `Something sloamlos': ${e}`})
    }
})
router.post('/updateBet', async (req, res) => {
    try {
        const lot = await Lot.findOne({_id: req.body.id});
        lot.lastBet = req.body.bet;
        lot.lastBetOwner = req.body.uId;
        await lot.save();
        const user = await User.findOne({_id: req.body.uId})
        if (!user.betList.includes(req.body.id))
            user.betList.push(req.body.id)
        user.save();
        res.status(201).json({message: 'The bet has been updated'})

    } catch (e) {
        res.status(500).json({message: `Something sloamlos': ${e}`})
    }
})
router.post('/updateStatus', async (req, res) => {
    try {
        const lot = await Lot.findOne({_id: req.body.id});
        lot.isClosed = true;
        lot.save();

        res.status(201).json({message: 'Lot closed'});
    } catch (e) {
        res.status(500).json({message: `Something sloamlos': ${e}`})
    }
})

module.exports = router;