import firebase from 'firebase/app'
import 'firebase/auth'


const firebase_config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APPID
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebase_config);
} else {
    firebase.app(); // if already initialized, use that one
}

export default firebase