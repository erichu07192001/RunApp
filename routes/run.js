
const express = require('express');
const router = express.Router();
const RunItem = require('../models/RunItem') // Getting runItem Schema


/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* add the value in the body to the list associated to the key */
router.post('/', // Add the additional information
  isLoggedIn,
  async (req, res, next) => {
    console.log("Attempting to save with runItem Schema")
    console.dir(req.body)
      const run = new RunItem({
        fullname: req.user.googlename,
        distance: parseFloat(req.body.distanceNum),
        distanceUnit: req.body.distanceOption,
        min: parseFloat(req.body.min),
        sec: parseFloat(req.body.sec),
        createdAt: new Date(),
        userId: req.user._id
        })
      await run.save();
      res.redirect('/run') // change to a different route
});

router.get('/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /run/remove/:itemId")
      await RunItem.remove({_id:req.params.itemId});
      res.redirect('/run')
});


// get the value associated to the key
router.get('/',
  isLoggedIn,
  async (req, res, next) => {
      console.log("Pulling from database")
      res.locals.items = await RunItem.find({userId:req.user._id}) // Setting res.locals.item to the RunItem
      console.log(res.locals.items.length)
      res.render('runList');
});


module.exports = router;
