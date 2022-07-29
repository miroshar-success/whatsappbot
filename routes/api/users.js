const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const auth = require("../../middleware/auth");
const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );
      const past = await User.aggregate([
        {
            $group : {
                _id : "_id",
                maxQ : {
                    $max : "$key"
                }
            }
        }
    ]);
    const newId = (past[0]? past[0].maxQ : 0) * 1 + 1;
      user = new User({
        key : newId,
        name,
        email,
        avatar,
        password,
        role : "User"
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          key: user.key,
          name : user.name,
          email : user.email,
          role : user.role
        }
      };

      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/users/getallusers
// @desc     get all registed users
// @access   private
router.post("/getallusers",auth,
  async (req,res) =>{
    const users = await User.find({});
    res.json(users);
  }
)
// @route    POST api/users/insertusers
// @desc     insert user
// @access   private
router.post("/insertuser",auth,
  async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password,expiry } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
        expiry,
        role : "User"
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const sa = await user.save();
      const users = await User.find({});
      res.json(users);
        
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

  }
)

// @route    POST api/users/getuser
// @desc     get user with email
// @access   private
router.post("/getuser",async (req,res) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  res.json(user);
})

// @route    POST api/users/edituser
// @desc     edit user with email
// @access   private
router.post("/edituser",auth,
  async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password,expiry,prevemail } = req.body;

    try {
      let user = await User.findOne({ prevemail });

      const salt = await bcrypt.genSalt(10);

      const newpassword = await bcrypt.hash(password, salt);

      let up = await User.findOneAndUpdate({email : prevemail},{$set : {name : name, email : email, password: newpassword, expiry : expiry}});
      let users = await User.find({});
      res.json(users);
        
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

  }
)


module.exports = router;
