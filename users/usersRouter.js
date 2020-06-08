const router = require("express").Router();
const Users = require("./users-model");

function protected(req, res, next) {
    if (req.session && req.session.user) {
      next()
    } else {
      res.status(401).json({ message: 'you have no session here' })
    }
  }

router.get("/", protected, (req,res) => {
    Users.findUser()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;

