const Music = require('../models/music.js');
const express = require('express');
const router = express.Router();

// CREATE - POST - /musics
router.post('/', async (req, res) => {
  try {
    const createMusic = await Music.create(req.body);
    return res.json(createMusic);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// INDEX - GET - /
router.get('/', async (req, res) => {
  try {
    const foundMusics = await Music.find();
    res.status(200).json(foundMusics);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// READ - GET - /musics/:musicId
router.get('/:musicId', async (req, res) => {
  try {
    const foundMusic = await Music.findById(req.params.musicId);
    if (!foundMusic) {
      res.status(404);
      throw new Error('Music not found.');
    }
    res.status(200).json(foundMusic);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

// DELETE - DELETE - /musics/:musicId
router.delete('/:musicId', async (req, res) => {
  try {
    const delMusic = await Music.findByIdAndDelete(req.params.musicId);
    res.status(200).json(delMusic);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UPDATE - PUT - /musics/:musicId
router.put('/:musicId', async (req, res) => {
  try {
    const updateMusic = await Music.findByIdAndUpdate(req.params.musicId, req.body, {
      new: true,
    });
    if (!updateMusic) {
      res.status(404);
      throw new Error('Pet not found.');
    }
    res.status(200).json(updateMusic);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});





module.exports = router;