const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');


router.get("/test",(req, res) => res.send("Hello"));

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

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
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/auth
// @desc     set name & email
// @access   Private

router.post("/setinfo",auth,async (req,res) => {
  const {name,email} = req.body;
  const {key,role} = req.user;
  const up = await User.findOneAndUpdate({key},{$set : {name,email}});
  try {
    const payload = {
      user: {
        key: key,
        name : name,
        email : email,
        role : role
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
  } catch (error) {
    res.status(500).send('Server error');
  }
})

router.post("/setpassword",auth,async (req,res) => {
  const {password,password1} = req.body;
  const {key} = req.user;
  const user = await User.findOne({key});
  const oldpassword = user.password;
  console.log(oldpassword,key,password,password1);
  const isMatch = await bcrypt.compare(password, oldpassword);
  console.log(key,isMatch);
  if (!isMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Invalid Credentials' }] });
  }
  const salt = await bcrypt.genSalt(10);

  const newpassword = await bcrypt.hash(password1, salt);
  const up = await User.findOneAndUpdate({key},{$set : {password : newpassword}});
  res.json({msg : "success"});

})

module.exports = router;
