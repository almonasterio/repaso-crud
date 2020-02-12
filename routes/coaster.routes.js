const express = require('express')
const router = express.Router()

const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')

router.get('/new', (req, res) => {
    Park.find()
        .then(allParks => res.render('coasters/new-coaster', {
            park: allParks
        }))
        .catch(err => console.log(err))
})


router.get('/', (req, res) => {
    Coaster.find()
        .populate('park')
        .then(allCoasters => res.render('coasters/coasters-index', {
           allCoasters
        })) // coasters: 
        .catch(err => console.log(err))
})


router.post('/new', (req, res) => {
    const {
        name,
        description,
        inversions,
        length,
        park
    } = req.body

    Coaster.create({
            name,
            description,
            inversions,
            length,
            park: park
        })
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
})


router.get('/:id', (req, res) => {
    Coaster.findById(req.params.id)
        .populate('park')
        .then(eachCoaster => res.render('coasters/coaster-details', {
            coaster: eachCoaster
        }))
        .catch(err => console.log(err))
})

router.post('/delete/:id', (req, res, next) => {
    Coaster.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log(err))
})


module.exports = router