const { Router } = require('express')
const router = Router()
const Category = require('../models/Category')
const Product = require('../models/Product')
const toDelete = require('../middleware/toDelete')
const fileUpload = require('../middleware/fileUpload')
const auth = require('../middleware/auth')


router.get('/read', auth, async(req, res) => {
    const product = await Product.find()
    console.log(product);
    res.render('admin/product', {
        layout: 'main',
        product,
    })
})

router.get('/add', auth, async(req, res) => {
    const categories = await Category.find();
    res.render('admin/productCreate', {
        layout: 'main',
        categories,
    })
})

router.post('/add', auth, fileUpload.single('productImg'), async(req, res) => {
    const { productName, productText, productSyntax, categoryId } = req.body
    if (req.file) {
        const productImg = req.file.filename
        const product = new Product({
            productName,
            productText,
            productSyntax,
            productImg,
            categoryId
        })
        await product.save()
        res.redirect('/admin/product/read')
    } else {
        const product = new Product({
            productName,
            productText,
            productSyntax,
            categoryId
        })
        await product.save()
        res.redirect('/admin/product/read')
    }
})

router.get('/edit/:id', auth, fileUpload.single('productImg'), async(req, res) => {
    const categories = await Category.find()
    const product = await Product.findById(req.params.id)

    res.render('admin/productEdit', {
        layout: 'main',
        categories,
        product
    })
})

router.post('/edit/:id', auth, fileUpload.single('productImg'), async(req, res) => {
    const { productImg } = await Product.findById(req.params.id)
    const product = req.body
    console.log(productImg + 'imgaasdsad');
    if (req.file) {
        toDelete(productImg)
        product.productImg = req.file.filename
    }
    await Product.findByIdAndUpdate(req.params.id, product, )
    res.redirect('/admin/product/read')
})

router.get('/delete/:id', auth, fileUpload.single('productImg'), async(req, res) => {
    const { productImg } = await Product.findById(req.params.id)

    await Product.findByIdAndDelete(req.params.id)
    toDelete(productImg)
    res.redirect('/admin/product/read')
})

module.exports = router