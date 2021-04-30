const mongoose = require('mongoose');
const User = require('../models/User');

const findAllUsers = (req,res) => {
    User.find((err,users)=> {
        err && res.status(500).send(err.message);
        res.status(200).json(users);
    })
}

const findById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        err && res.status(500).send(err.message);
        res.status(200).json(user);
    })
}

const addUser = (req, res) => {
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });

    user.save((err, usr) => {
        err && res.status(500).send(err.message);
        res.status(200).json(usr);
    });
};


const deleteUser = (req, res) => {
    let userId = req.params.id
    User.findById(userId, (err, users)=> {
        err && res.status(500).send(err.message);
        users.remove(err => {
            if (err) res.status(500).send(err.message);
            res.status(200).json(users);
        })
    })
}

const editUser = (req, res) => {
    let userId = req.params.id
    let update = req.body

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    
        if(err) res.status(500).send(err.message);
        
        res.status(200).send({users: userUpdated})
    })
}

module.exports = { findAllUsers, findById, addUser, deleteUser, editUser};