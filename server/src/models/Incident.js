const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  action: { type: String, required: true },
  actor: { type: String, default: 'System' }
});

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  severity: { 
    type: String, 
    enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], 
    default: 'MEDIUM' 
  },
  status: { 
    type: String, 
    enum: ['OPEN', 'ACKNOWLEDGED', 'INVESTIGATING', 'RESOLVED'], 
    default: 'OPEN' 
  },
  affectedSystem: { type: String, required: true },
  assignedTo: { type: String, default: 'Unassigned' },
  timeline: [timelineSchema]
}, { timestamps: true });

module.exports = mongoose.model('Incident', incidentSchema);