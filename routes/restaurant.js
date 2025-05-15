const express = require('express');
const router = express.Router();
const db = require('../services/db');


router.get('/', async (req, res) => {
  try { 
  let query = db.collection('restaurant');
  // 0. id
  if (req.query.id) {

    const doc = await query.doc(req.query.id).get();
    res.json({id:doc.id, ...doc.data()});

  } else {

    // 1. name
    if (req.query.name) query = query.where('name', '==', req.query.name);

    // 2. foodOrigin
    if (req.query.foodOrigin) query = query.where('foodOrigin', '==', req.query.foodOrigin);

    // 3. priceRange
    if (req.query.priceRange) query = query.where('priceRange', '==', req.query.priceRange);
    
    // 4. tags (any)
    if (req.query.tags) {
      let tags = req.query.tags;
      if (typeof tags === 'string') tags = JSON.parse(tags);

      query = query.where('tags', 'array-contains-any', tags)
    }

    // 5. location
    if (req.query.location) query = query.where('location', '==', req.query.location);

    // 6. rating (ge)
    if (req.query.rating) query = query.where('rating', '>=', req.query.rating);

    let all = [];
    const snapshot = await query.get();
    snapshot.forEach(doc => {
      const data = doc.data();
      all.push({id: doc.id, ...data});
    });
    res.json(all);

  }

  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }

});


router.get('/test', (req, res) => {
  res.json({ message: 'Test route works!' });
});

router.get('/names', async (req, res) =>{
  try {
    let query = db.collection('restaurant');

    let all = [];
    const snapshot = await query.get();
    snapshot.forEach(doc => {
      const data = doc.data();
      all.push({id: doc.id, name: data.name});
    });
    res.json(all);


  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Failed to fetch data' });}
})




module.exports = router;
