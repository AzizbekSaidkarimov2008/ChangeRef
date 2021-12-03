const { Router } = require('express')
const router = Router()
const NavInfo = require('../models/NavInfo')
const footerInfo = require('../models/Footerinfo')
const auth = require('../middleware/auth')


router.get('/', auth, async(req, res) => {
    const navInfo = await NavInfo.find()
    const footerRight = await footerInfo.find()

    res.render('admin/index', {
        layout: 'main',
        navInfo,
        footerRight
    })
})




module.exports = router