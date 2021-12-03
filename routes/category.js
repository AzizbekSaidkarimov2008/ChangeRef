const { Router } = require('express')
const router = Router()
const Category = require('../models/Category')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')



router.get('/read', auth, async(req, res) => {
    const category = await Category.find()
    res.render('admin/category', {
        title: 'kategoriyalar ko`rish',
        layout: 'main',
        category,
    })
})
router.get('/read/:id', auth, async(req, res) => {
    const { categoryName, background } = await Category.findById(req.params.id);
    let products = await Category.aggregate([{
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id),
            },
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "categoryId",
                as: "mahsulotlar",
            },
        },
        {
            $unwind: {
                path: "$mahsulotlar",
            },
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                },
                mahsulotlar: {
                    $push: "$mahsulotlar",
                },
            },
        },
        {
            $project: {
                _id: "$id._id",
                productName: "$_id.productName",
                productText: "$_id.productText",
                productSyntax: "$_id.productSyntax",
                productImg: "$_id.productImg",
                mahsulotlar: "$mahsulotlar",
            },
        },
    ]);
    products = products[0].mahsulotlar;
    console.log("asdasdasdasdasdasdasd");
    res.render('admin/categories', {
        title: 'kategoriyalar ko`rish',
        layout: 'main',
        products,
        categoryName,
        background
    })
})


router.get('/add', auth, async(req, res) => {
    console.log();

    res.render('admin/categoryCreat', {
        layout: 'main',
        title: 'kategoriya yaratish',
    })
})

router.post('/add', auth, async(req, res) => {
    try {
        const { categoryName } = req.body
        const category = new Category(req.body)

        await category.save()
        res.redirect('/admin/category/read')
    } catch (error) {
        console.log(error.message);
    }
})

router.get('/edit/:id', auth, async(req, res) => {
    const category = await Category.findById(req.params.id)
    res.render('admin/categoryEdit', {
        layout: 'main',
        category,
    })
})
router.post('/edit/:id', auth, async(req, res) => {
    const Update = {}
    Update.categoryName = req.body.categoryName

    await Category.findByIdAndUpdate(req.params.id, Update)
    res.redirect('/admin/category/read')
})
router.get('/delete/:id', auth, async(req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.redirect('/admin/category/read')
})

module.exports = router