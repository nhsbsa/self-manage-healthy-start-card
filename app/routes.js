// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line

router.post('/v1/child-name', function (req, res) {

    const firstName = req.session.data['childsfirstname']
    const lastName = req.session.data['childslastname']
  
    if (firstName && lastName) {
      res.redirect('/v1/hs-card/pregnancy-and-children');
    } else {
        res.redirect('/v1/hs-card/child-name');
    }
})
  
router.post('/v1/your-name', function (req, res) {

    const firstName = req.session.data['first-name']
    const lastName = req.session.data['last-name']

    if (firstName && lastName) {
       res.redirect('/v1/personal-details/cya-personal-details');
    } else {
        res.redirect('/v1/personal-details/personsdetails');
    }

})

module.exports = router;
