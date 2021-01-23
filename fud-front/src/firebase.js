import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SUNDER_ID,
    appId: process.env.FIREBASE_API_KEY,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    console.error('Firebase initialization failed with error:\n', err.message) 
}

const firebase = firebase;
export default firebase;