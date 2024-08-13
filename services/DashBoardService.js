const Dashboard = require('../models/dashboard');
const { NotFoundError } = require('../utils/helper');

class DashboardService {
  
  /** Create a new dashboard entry */
  static async create(req) {
    try {
        const body = req.body;
        console.log(body)
      const dashboardEntry = new Dashboard(body);
      return await dashboardEntry.save();
    } catch (error) {
      throw new Error(`Error creating dashboard entry: ${error.message}`);
    }
  }

  /** Retrieve a dashboard entry by ID */
  static async update(body, id) {
    const data = await Dashboard.findById(id);
    if (!data) {
      throw new NotFoundError("Dashboard Data Not Found");
    }

    // Update the document with the new data
    Object.assign(data, body);

    // Save the updated document
    await data.save();

    return data;
  }

  /** Retrieve all dashboard entries */
  static async get(queryparams) {
    try {
      let searchClause = {};
      if (queryparams.day) {
        const today = new Date();
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - queryparams.day);
  
        searchClause = {
          createdAt: {
            $gte: pastDate, // Greater than or equal to 15 days ago
            $lte: today // Less than or equal to today
          }
        };
      }
      return await Dashboard.find(searchClause);
    } catch (error) {
      throw new Error(`Error fetching all dashboard entries: ${error.message}`);
    }
  }

 

  /** Delete a dashboard entry by ID */
  static async delete(id) {
    try {
        const data = await Dashboard.findByIdAndDelete(id);

        if (!data) {
          throw new NotFoundError("Dashboard entry not found");
        }
  
        return data;
    } catch (error) {
      throw new Error(`Error deleting dashboard entry with ID ${id}: ${error.message}`);
    }
  }
}

module.exports = DashboardService;
