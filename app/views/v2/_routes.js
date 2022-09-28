// ********************************
// APPLY (v2)
// ********************************

// External dependencies
const express = require('express');
const router = express.Router();

// ****************************************
// * Log in - 2 factor authentication
// ****************************************

router.post('/authenticate-type', (req, res) => {

  const authType = req.session.data['auth']

  if (authType) {
    res.redirect('/v2/before-you-start/authenticate-details')
  } else {
    res.redirect('/v2/before-you-start/authenticate-type')
  }

})

// ****************************************
// * Freeze or Unfreeze card
// ****************************************

// Freezing healthy start card
router.post('/freeze-card', (req, res) => {
  
  const freezeCard = req.session.data['freeze']

  if (freezeCard == 'yes'){
    res.redirect('/v2/hs-card/card-frozen-or-unfrozen');
  } else if (freezeCard == 'no') {
    res.redirect('/v2/hs-card/lost-or-stolen-card');
  } else {
    res.redirect('/v2/hs-card/freeze-card');
  }

})

router.post('/unfreeze-card', (req, res) => {
  
  const freezeCard = req.session.data['unfreeze']

  if (freezeCard == 'yes'){
    res.redirect('/v2/hs-card/card-frozen-or-unfrozen');
  } else if (freezeCard == 'no') {
    res.redirect('/v2/hs-card/lost-or-stolen-card');
  } else {
    res.redirect('/v2/hs-card/freeze-card');
  }

})

// ****************************************
// * Updating childs details
// ****************************************

// Updating a childs name
router.post('/child-name', (req, res) => {

  const firstName = req.session.data['childsfirstname']
  const lastName = req.session.data['childslastname']

  if (firstName && lastName) {
    res.redirect('/v2/hs-card/child-dob');
    // res.redirect('/v2/hs-card/pregnancy-and-children');
  } else {
    res.redirect('/v2/hs-card/child-name');
  }
})

// Updating a childs date of birth
router.post('/child-dob', (req, res) => {
  console.log('running function');
  const childsdateofbirthday = req.session.data['childsdateofbirthday']
  const childsdateofbirthmonth = req.session.data['childsdateofbirthmonth']
  const childsdateofbirthyear = req.session.data['childsdateofbirthyear']

  const childsdateofbirthDisplay = childsdateofbirthday + ' / ' + childsdateofbirthmonth + ' / ' + childsdateofbirthyear;

  if (childsdateofbirthday && childsdateofbirthmonth && childsdateofbirthyear) {

    console.log('running if statement');

    var childList = req.session.data.childList

    // If no array exists, create one called 'childList'. If one already exists, do nothing.

    childList = (typeof childList != 'undefined' && childList instanceof Array) ? childList : []

    // Create a variable of the posted information

    var childsfirstname = req.session.data['childsfirstname']
    var childslastname = req.session.data['childslastname']

    // Add the posted information into the 'childList' array

    childList.push({ "ChildsFirstName": childsfirstname, "ChildsLastName": childslastname, "ChildsDOB": childsdateofbirthDisplay });

    req.session.data.childList = childList;

    res.redirect('/v2/hs-card/child-updated');

  } else {
    res.redirect('/v2/hs-card/child-dob');
  }
})

// ****************************************
// * Updating personal details
// ****************************************

// Updating the beneficiaries name
router.post('/full-name', (req, res) => {

  const firstName = req.session.data['first-name']
  const lastName = req.session.data['last-name']

  if (firstName && lastName) {
    res.redirect('/v2/personal-details/date-of-birth');
  } else {
    res.redirect('/v2/personal-details/full-name');
  }

})

// Date of birth
router.post('/date-of-birth', (req, res) => {

  const dobDay = req.session.data['dob-day']
  const dobMonth = req.session.data['dob-month']
  const dobYear = req.session.data['dob-year']

  const fullDateOfBirth = dobDay + ' / ' + dobMonth + ' / ' + dobYear;

  if (fullDateOfBirth) {
    res.redirect('/v2/personal-details/address');
  } else {
    res.redirect('/v2/personal-details/date-of-birth');
  }

})

router.post('/address', (req, res) => {

  const firstName = req.session.data['first-name']
  const addressLine1 = req.session.data['address-line-1']
  const addressLine2 = req.session.data['address-line-2']
  const addressTown = req.session.data['address-town']
  const addressCounty = req.session.data['address-county']
  const addressPostcode = req.session.data['address-postcode']
  const newPin = req.session.data['receive-pin']

  if (firstName) {
    if (addressLine1) {
      res.redirect('/v2/personal-details/national-insurance-number');
    } else {
      res.redirect('/v2/personal-details/address');
      console.log('running here')
    }
  } else if (newPin == 'post') {
    if (addressLine1) {
      res.redirect('/v2/hs-card/cya-new-pin');
    } else {
      res.redirect('/v2/personal-details/address');
      console.log('running this')
    }
  } else {
    res.redirect('/v2/personal-details/address');
    console.log('failed')
  }

})

router.post('/nino', (req, res) => {

  const nino = req.session.data['nino']

  if (nino) {
    res.redirect('/v2/personal-details/confirmation-personal-details');
  } else {
    res.redirect('/v2/personal-details/national-insurance-number');
  }

})

// ****************************************
// * Request a new PIN
// ****************************************

// Do you need a new PIN sent to you?
router.post('/request-new-pin', (req, res) => {

  const newPin = req.session.data['pin']

  if (newPin == 'yes') {
    res.redirect('/v2/hs-card/receive-new-pin');
  } else if (newPin == 'no') {
    res.redirect('/v2/hs-card/your-healthy-start-card');
  } else {
    res.redirect('/v2/hs-card/request-new-pin');
  }

})

// How would you like your new PIN sent to you?
router.post('/receive-new-pin', (req, res) => {

  const howToReceive = req.session.data['receive-pin']

  if (howToReceive == 'mobile') {
    res.redirect('/v2/personal-details/mobile-phone-number');
  } else if (howToReceive == 'post') {
    res.redirect('/v2/personal-details/address');
  } else {
    res.redirect('/v2/hs-card/receive-new-pin');
  }

})

// Enter mobile phone number
router.post('/mobile-phone-number', (req, res) => {

  const mobileNumber = req.session.data['mobilephonenumber']

  if (mobileNumber) {
    res.redirect('/v2/hs-card/cya-new-pin');
  } else {
    res.redirect('/v2/personal-details/mobile-phone-number');
  }

})

module.exports = router;