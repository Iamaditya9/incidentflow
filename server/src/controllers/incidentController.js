const Incident = require('../models/Incident');

exports.getIncidents = async (req, res) => {
  try {
    const { status, severity, system } = req.query;
    let query = {};
    if (status) query.status = status;
    if (severity) query.severity = severity;
    if (system) query.affectedSystem = system;

    const incidents = await Incident.find(query).sort({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createIncident = async (req, res) => {
  try {
    const { title, description, severity, affectedSystem } = req.body;
    if (!title || !description || !affectedSystem) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newIncident = new Incident({
      title,
      description,
      severity: severity || 'MEDIUM',
      affectedSystem,
      timeline: [{ action: 'Incident detected and created', actor: 'System' }]
    });

    const savedIncident = await newIncident.save();
    
    if (req.io) {
      req.io.emit('incident:created', savedIncident);
    }

    res.status(201).json(savedIncident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo, actionNote } = req.body;

    const incident = await Incident.findById(id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }

    if (status) incident.status = status;
    if (assignedTo) incident.assignedTo = assignedTo;
    
    incident.timeline.push({
      action: actionNote || `Status updated to ${status || incident.status}`,
      actor: assignedTo || 'Operator'
    });

    const updated = await incident.save();

    if (req.io) {
      req.io.emit('incident:updated', updated);
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};