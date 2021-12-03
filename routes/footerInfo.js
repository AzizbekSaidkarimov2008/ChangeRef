const { Router } = require('express')
const router = Router()
const fileUpload = require('../middleware/fileUpload')
const footerInfo = require('../models/Footerinfo')
const auth = require('../middleware/auth')


router.get('/add', auth, async(req, res) => {
    const footerRight = await footerInfo.find()
    res.render('admin/footerInfo', {
        layout: 'main',
        footerRight,
    })
})

router.post('/add', auth, async(req, res) => {
    const { link1, link2, link3 } = req.body
    const setting = new footerInfo({
        link1,
        link2,
        link3,
    })
    await setting.save()
    res.redirect('/admin')
})

router.get('/view', auth, async(req, res) => {
    const footerRight = await footerInfo.find()

    res.render('admin/footerView', {
        footerRight,
        layout: 'main'
    })
})

router.get('/edit/:id', auth, async(req, res) => {
    const footerRight = await footerInfo.findById(req.params.id)

    res.render('admin/footerEdit', {
        layout: "main",
        title: "Footer Edit",
        footerRight
    })
})

router.post('/edit/:id', auth, async(req, res) => {


    await footerInfo.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/admin/footerInfo/view')
})


router.get('/delete/:id', auth, async(req, res) => {

    await footerInfo.findByIdAndDelete(req.params.id)
    res.redirect('/admin/footerInfo/view')
})



module.exports = router