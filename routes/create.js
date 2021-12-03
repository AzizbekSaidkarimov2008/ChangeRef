const { Router } = require('express')
const router = Router()
const fileUpload = require('../middleware/fileUpload')
const toDelete = require('../middleware/toDelete')
const NavInfo = require('../models/NavInfo')
const auth = require('../middleware/auth')


router.get('/view', auth, async(req, res) => {
    const navInfo = await NavInfo.find()
    res.render('admin/create', ({
        layout: 'main',
        title: 'create',
        navInfo
    }))
})

router.post('/view', auth, fileUpload.single('img'), async(req, res) => {
    const { navtitle, tel } = req.body

    if (req.file) {
        const img = req.file.filename
        const navinfo = new NavInfo({
            navtitle,
            img,
            tel
        })
        await navinfo.save()
        res.redirect('/admin')
    } else {
        const navinfo = new NavInfo({
            navtitle,
            tel
        })
        await navinfo.save()
        res.redirect('/admin')
    }
})
router.get('/read', auth, async(req, res) => {
    const navInfo = await NavInfo.find()

    res.render('admin/logoRead', {
        layout: 'main',
        navInfo
    })
})

router.get('/edit/:id', auth, async(req, res) => {
    const navinfo = await NavInfo.findById(req.params.id)
    res.render('admin/logoEdit', {
        title: 'O`zgartirish',
        layout: 'layout',
        navinfo
    })
})

router.post('/edit/:id', auth, fileUpload.single('img'), async(req, res) => {
    const { img } = await NavInfo.findById(req.params.id)
    const navinfo = req.body

    if (req.file) {
        toDelete(img)
        navinfo.img = req.file.filename
    }

    await NavInfo.findByIdAndUpdate(req.params.id, navinfo, res.redirect('/admin'))

})

router.get('/delete/:id', async(req, res) => {
    const { img } = await NavInfo.findById(req.params.id)
    toDelete(img)
    await NavInfo.findByIdAndDelete(req.params.id, res.redirect('/admin'))
})

module.exports = router;