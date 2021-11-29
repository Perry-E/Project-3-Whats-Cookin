const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require("../models/users")

const router = express.Router();

// Fetches Userinfo if logged in
router.get('/', (req, res) => {
  res.json(req.session.loggedUser)
})

// Route to logins
router.post('/', async (req, res) => {
  try {
    // console.log("res.body",req.body)
    const userFound = await Users.findOne({email: req.body.email})
    // console.log('userInfo',userFound);
    if (!userFound) {
      return res.json("Unable to find user, make sure you typed in the right email")
    }
    const passwordMatched = await bcrypt.compare(req.body.password, userFound.password);
    if(!passwordMatched) {
      return res.json("Unable to log in, incorrect password")
    }

    req.session.loggedUser = userFound
    res.json(userFound)

  } catch (err) {
    console.log(err)
  }
})

router.delete('/', (req, res) => {
  req.session.destroy(() => res.json("Log out successful"))
})

module.exports = router;