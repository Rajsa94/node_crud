const  DashboardService  = require('../services/DashBoardService');
const { HttpCode } = require('../utils/types');

class DashboardController {
  
  /** Creating a user */
  static async create(req, res, next) {
    try {
      const user = await DashboardService.create(req);
      res.status(HttpCode.CREATED).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
        const id = req.params.id
        const body = req.body;
      const token = await DashboardService.update(body,id);
      res.status(HttpCode.OK).json({ data: token });
    } catch (e) {
      next(e);
    }
  }

  /** Current user */
  static async get(req, res, next) {
    const queryparams = req.query;
    try {
      const user = await DashboardService.get(queryparams);
      res.status(HttpCode.OK).json({ data: user });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req, res, next) {
    try {
        const id = req.params.id
      const user = await DeshBordService.delete(id);
      res.status(HttpCode.OK).json({ data: user });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = DashboardController;
