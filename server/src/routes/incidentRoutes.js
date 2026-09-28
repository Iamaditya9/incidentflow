const express = require('express');
const router = express.Router();
const { getIncidents, createIncident, updateIncidentStatus } = require('../controllers/incidentController');

router.get('/', getIncidents);
router.post('/', createIncident);
router.patch('/:id', updateIncidentStatus);

module.exports = router;