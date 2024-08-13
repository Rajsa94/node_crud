const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  sentEmails: {
    type: Number,
    default: 0
  },
  activityTime: {
    type: String,
    default: () => {
      const date = new Date();
      return date.getHours().toString().padStart(2, '0'); // "HH"
    }
  },
  activityState: {
    type: String,
    enum: ['active', 'inactive', 'pending', 'banned'],
    default: 'active'
  }
},{
  timestamps: true,
},);

const Dashboard = mongoose.model('Dashboard', DashboardSchema);

module.exports = Dashboard;
