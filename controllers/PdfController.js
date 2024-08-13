const  PdfService  = require('../services/PdfService');
const { HttpCode } = require('../utils/types');

class PdfController {
  
  /** Creating a user */
  static async create(req, res, next) {
    try {
      const user = await PdfService.create(req);
      res.status(HttpCode.CREATED).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = PdfController;
