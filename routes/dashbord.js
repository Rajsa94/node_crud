const express = require('express');
const DeshBordController = require('../controllers/DashBoardController');
// const Validation = require('../validations');
// const { validate } = Validation;
// const { verifyUser } = require('../middlewares');

const router = express.Router();

// POST create a new user
router.post('/', DeshBordController.create);
router.put('/:id',DeshBordController.update);
router.get('/', DeshBordController.get);
router.delete('/:id', DeshBordController.delete);


module.exports = router;
