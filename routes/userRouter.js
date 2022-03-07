const { User } = require('../models')
const express = require('express')
var bodyParser = require('body-parser').json();
const router = express.Router()

router.get('/user', async (req, res) => {
    try {
        const users = await User.findAll()
        res.send({ users: users })
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.post('/user', bodyParser ,async (req, res) => {
    try {
        const { name, gender, age, street, city } = req.body
        const newUser = await User.create({
            name: name,
            gender: gender,
            age: age,
            street: street,
            city: city
        })
        return res.send({ user:newUser})
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.put('/user', bodyParser, async (req, res) => {
    const { uuid } = req.body
    try {
        if( !uuid)  return res.status(400).send("invalid user uuid")
        const { name, gender, age, street, city } = req.body
        const temp = await User.findOne({ where: { uuid: uuid } })
        temp.name = name
        temp.gender = gender,
        temp.age= age,
        temp.street=street,
        temp.city= city
        temp.save({ fields: ['name','gender','age','street','city'] })
        return res.send({ user:temp})
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.delete('/user/:uuid', bodyParser, async (req, res) => {
    const uuid  = req.params.uuid
    try {
        if( !uuid)  return res.status(400).send("invalid user uuid")
        const newUser = await User.destroy({where:{ uuid: uuid }})
        return res.send({ user:newUser})
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router