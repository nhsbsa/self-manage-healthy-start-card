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

module.exports = router;
