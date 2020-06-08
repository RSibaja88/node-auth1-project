const bcrypt = require('bcryptjs');
const router = require("express").Router();
const Users = require("../users/users-model");


router.post('/register', (req, res) => {
    console.log('register endpoint');
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10);
    Users.addUser({
        user_name,
        password: hash,
      })
        .then(data => {
          console.log(data)
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ message: `Something went really poorly` })
        })
})

router.post("/login", (req, res) => {
    const { user_name, password } = req.body
    Users.findBy({ user_name }).first()
      .then(user => {
        if (user && bc.compareSync(password, user.password)) {
          req.session.user = user
          res.json({ message: `Welcome, ${user.user_name}! Here is a cookie` })
        } else {
          res.status(401).json({ message: 'Invalid credential' })
        }
      })
      .catch(err => {
        console.log(err)
      })
  })

  router.get("/logout", (req, res) => {
    console.log('logout endpoint')
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.json({ message: 'Cannot log out' })
        } else {
          res.json({ message: 'good bye' })
        }
      })
    }
  })

module.exports = router;