import firebase from 'firebase/app'
import 'firebase/auth'


const firebase_config = {
    apiKey: "AIzaSyD2QK5v3z7j23sY74h-KS-a1Fhm9xIqMcQ",
    authDomain: "trello-clone-15f4a.firebaseapp.com",
    projectId: "trello-clone-15f4a",
    storageBucket: "trello-clone-15f4a.appspot.com",
    messagingSenderId: "572455070873",
    appId: "1:572455070873:web:a9a4162cd4d393ceb4dc08"
}


if (!firebase.apps.length) {
    firebase.initializeApp(firebase_config);
} else {
    firebase.app(); // if already initialized, use that one
}

export default firebase