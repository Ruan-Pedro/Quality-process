const express = require('express');
const router = require('express').Router();
const Port = process.env.PORT;
const ClientControllers = require('../Controllers/ClientController');

router.get('/', (req, res) => {
    res.status(200).send({msg:`Server running on Port ${Port}`})
})

//Clients
router.get('/clients', ClientControllers.getClients);
router.get('/client/:id', ClientControllers.getClientById);
router.post('/client', express.json(), ClientControllers.insertClients);
router.put('/client/:id', express.json(), ClientControllers.updateClient);
router.delete('/client/:id', ClientControllers.deleteClient);

module.exports = router