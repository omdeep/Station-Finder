const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
const Requirement = require('../models/requirement.model')

router.get('/inprogress', (req, res) => {
    Requirement.find({ $or: [{ status: 'inprogress' }, { status: 'open' }] })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            })
        })
})

router.get('/completed', (req, res) => {
    Requirement.find({ status: 'completed' })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            })
        })
})

router.get('/img/:id', (req, res) => {
    Requirement.findById(req.params.id)
        .then(result => {
            if (result)
                if (result.img) {
                    res.sendFile(__dirname.replace('routes', '') + 'uploads/' + result.img)
                }
                else
                    return res.status(404).json({
                        error: 'Test case not found.'
                    })
            else
                return res.status(404).json({
                    error: 'Requirement not found.'
                })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            })
        })
})

router.post('/', (req, res) => {
    console.log(req.body)

    if (!req.body.name || !req.body.address || !req.body.opening || !req.body.rating || !req.body.region || !req.body.status)
        return res.status(400).json({
            error: 'Missing data'
        })


    const newRequirement = new Requirement({
        name: req.body.name,
        address: req.body.address,
        opening: req.body.opening,
        rating: req.body.rating,
        region: req.body.region,
        status: req.body.status
    })


    newRequirement.save()
        .then(() => {
            res.status(201).json({
                message: 'Requirements successfully added.'
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
                
            })
            console.log(err);
        })
})

router.delete('/:id', (req, res) => {
    Requirement.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({
                message: 'Requirement successfully deleted.'
            })
        })
})

router.patch('/:id', upload.single('img'), (req, res) => {
    Requirement.findByIdAndUpdate(req.params.id, { img: req.params.id + path.extname(req.file.originalname), status: 'completed' })
        .then(() => {
            res.status(200).json({
                message: 'Requirements successfully updated.'
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            })
        })
})

router.patch('/inprogress/:id', (req, res) => {
    Requirement.findByIdAndUpdate(req.params.id, { status: 'inprogress' })
        .then(() => {
            res.status(200).json({
                message: 'Requirements successfully updated.'
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            })
        })
})


module.exports = router