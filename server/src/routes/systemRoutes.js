const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json([
    { system: 'Authentication Service', status: 'OPERATIONAL' },
    { system: 'Payment API', status: 'OPERATIONAL' },
    { system: 'Customer Database', status: 'WARNING' }
  ]);
});

module.exports = router;






















