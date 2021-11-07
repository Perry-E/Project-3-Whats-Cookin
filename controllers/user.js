const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require("../models/users")
const cloudinary = require("../imageUtility/cloudinary");
const upload = require("../imageUtility/multer");

const router = express.Router();

router.get('/:id', async(req, res) => {
  try {
    const userInfo = await Users.findById(req.params.id);
    res.json(userInfo)
  } catch(err) {
    console.log(err)
  }
})

// Route to create user
router.post('/', upload.single("image"), async (req, res) => {
  try {
    const emailExists = await Users.findOne({email: req.body.email}) 
    if (emailExists) {
      return res.json('Email is already used')
    }

    // ? If user uploaded an image, add to cloudinary and attach result to req.body
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.profileImage = { image: result.secure_url, cloudinary_id: result.public_id }
    }
    // ? Encrypt user's password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // ? Finally, create user's account
    const newUser = await Users.create(req.body);
    res.json(newUser)

  } catch (err) {
    console.log(err)
  }
})

module.exports = router;