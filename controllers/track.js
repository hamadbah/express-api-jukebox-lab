const Track = require('../models/track.js');
const express = require('express');
const router = express.Router();

// CREATE - POST - 
router.post('/', async (req, res) => {
  try {
    const createTrack = await Track.create(req.body);
    return res.json(createTrack);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// INDEX - GET - /
router.get('/', async (req, res) => {
  try {
    const foundTrack = await Track.find();
    res.status(200).json(foundTrack);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// READ - GET - 
router.get('/:trackId', async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);
    if (!foundTrack) {
      res.status(404);
      throw new Error('Track not found.');
    }
    res.status(200).json(foundTrack);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

// DELETE - DELETE - 
router.delete('/:trackId', async (req, res) => {
  try {
    const delTrack = await Track.findByIdAndDelete(req.params.trackId);
    res.status(200).json(delTrack);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UPDATE - PUT -
router.put('/:trackId', async (req, res) => {
  try {
    const updateTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {
      new: true,
    });
    if (!updateTrack) {
      res.status(404);
      throw new Error('Pet not found.');
    }
    res.status(200).json(updateTrack);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});





module.exports = router;