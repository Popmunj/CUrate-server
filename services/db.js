const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
// const serviceAccount = require('../db-keys.json');

try {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_KEY_B64, 'base64').toString('utf8')
  );


  initializeApp({
    credential: cert(serviceAccount),
  });

  const db = getFirestore();
  module.exports = db;

} catch (err) {
  console.log(err);
}

