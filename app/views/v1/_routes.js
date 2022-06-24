// ********************************
// APPLY (v1)
// ********************************

// External dependencies
const express = require('express');
const router = express.Router();

// ********************************

// Updating a childs name
router.post('/child-name', (req, res) => {

  const firstName = req.session.data['childsfirstname']
  const lastName = req.session.data['childslastname']

  if (firstName && lastName) {
    res.redirect('/v1/hs-card/pregnancy-and-children');
  } else {
      res.redirect('/v1/hs-card/child-name');
  }
})

// Updating the beneficiaries name
router.post('/full-name', (req, res) => {

  const firstName = req.session.data['first-name']
  const lastName = req.session.data['last-name']

  if (firstName && lastName) {
     res.redirect('/v1/personal-details/cya-personal-details');
  } else {
      res.redirect('/v1/personal-details/full-name');
  }

})


module.exports = router;