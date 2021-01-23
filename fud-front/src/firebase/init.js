import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SUNDER_ID,
    appId: process.env.REACT_APP_API_KEY,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    console.error('Firebase initialization failed with error:\n', err.message) 
}

const firebaseConst = firebase;
export default firebaseConst;