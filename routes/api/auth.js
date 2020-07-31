const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");
const Inventory = require("../../models/Inventory");

// @route   Post api/auth
// @desc    Authenticate user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    // Validate passowrd
    // Note: bcrypt does not need to be provided the salt, because bcrypt will automatically extract
    // salt that is generated by bcrypt and so can only compare plaint text password with hash
    // if it was originally generated by bcrypt
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              _id: user.id,
              name: user.name,
              isAdmin: user.isAdmin,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// @route   Get api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

// @route   Get api/auth/inventory
// @desc    Get user's inventory
// @access  Private
router.get("/inventory", auth, (req, res) => {
  Inventory.find({ owner: `${req.user.id}` }).then((inventory) =>
    res.json(inventory)
  );
});
module.exports = router;
