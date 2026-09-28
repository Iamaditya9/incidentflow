const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json([
    { timestamp: new Date(), message: 'System initialization completed successfully.' }
  ]);
});

module.exports = router;