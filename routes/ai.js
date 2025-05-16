const express = require('express');
const router = express.Router();
const getSuggestion = require('../services/gpt');
const db = require('../services/db');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

router.get('/', async (req,res) => {
    try {
        const id = getRandomInt(30);
      
        const doc = await db.collection('question').doc(String(id)).get();
        res.json({id: doc.id, ...doc.data()});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch data' });
        
    }
})


router.post('/', async (req, res) => {
    try {
        const question = req.body.question;
        const answer = req.body.answer;

        const suggestion = await getSuggestion(question, answer);
        res.json(suggestion);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to fetch data' });
        
    }

})

module.exports = router;


