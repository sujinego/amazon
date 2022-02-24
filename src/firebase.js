import firebase from 'firebase';



const firebaseConfig = {
    apiKey: "AIzaSyAFDpf0hFADQn5KsOJ7Egp_OiqtCy-90kg",
    authDomain: "parano2.firebaseapp.com",
    projectId: "parano2",
    storageBucket: "parano2.appspot.com",
    messagingSenderId: "264592009285",
    appId: "1:264592009285:web:92eda1fc46928516591b2c",
    measurementId: "G-9YRTBBH10E"
  };

  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};