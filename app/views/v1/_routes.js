// ********************************
// APPLY (v1)
// ********************************

// External dependencies
const express = require('express');
const router = express.Router();
const moment = require('moment');
const stringSimilarity = require("string-similarity");
const geolib = require('geolib');
const https = require("https");

// CONSTANTS
const today = new Date(Date.now());
const { listenerCount } = require('gulp');

// ********************************


router.post('/v1/child-name', function (req, res) {

    const firstName = req.session.data['childsfirstname']
    const lastName = req.session.data['childslastname']
  
    if (firstName && lastName) {
      res.redirect('/v1/hs-card/pregnancy-and-children');
    } else {
        res.redirect('/v1/hs-card/child-name');
    }
  
})