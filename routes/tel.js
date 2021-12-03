const { Router } = require('express')
const router = Router()
const Tel = require('../models/Tel')
const auth = require('../middleware/auth')


router.get('/korish', auth, async(req, res) => {
    const telefons = await Tel.find()
    res.render('admin/tel', {
        layout: 'main',
        telefons,
    })
})

router.get('/add', auth, async(req, res) => {
    const tels = await Tel.find()
    res.render('admin/telCreate', {
        layout: 'main',
        tels,
    })
})

router.post('/add', auth, async(req, res) => {
    const { tel } = req.body
    const telefon = new Tel({
        tel
    })
    await telefon.save()
    res.redirect('/admin/tel/korish')
})

router.get('/edit/:id', auth, async(req, res) => {
    const telefons = await Tel.findById(req.params.id)
    res.render('admin/telEdit', {
        layout: 'main',
        telefons
    })
})

router.post('/edit/:id', auth, async(req, res) => {
    const telefons = req.body
    await Tel.findByIdAndUpdate(req.params.id, telefons)
    res.redirect('/admin/tel/korish')
})

router.get('/delete/:id', auth, async(req, res) => {

    await Tel.findByIdAndDelete(req.params.id)
    res.redirect('/admin/tel/korish')
})

module.exports = router