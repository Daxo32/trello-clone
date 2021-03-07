import firebase from 'firebase/app'
import 'firebase/auth'


const firebase_config = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APPID
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebase_config);
} else {
    firebase.app(); // if already initialized, use that one
}

export default firebase