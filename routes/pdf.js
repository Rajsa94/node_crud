const express = require('express');
const PdfController = require('../controllers/PdfController');
// const Validation = require('../validations');
// const { validate } = Validation;
// const { verifyUser } = require('../middlewares');

const router = express.Router();

// POST create a new user
router.post('/', PdfController.create);



module.exports = router;
