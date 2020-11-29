require('dotenv').config();
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};
const fbApp = firebase.initializeApp(config);
const dbRef = fbApp.database().ref(`monitor-data`);
export default dbRef;
