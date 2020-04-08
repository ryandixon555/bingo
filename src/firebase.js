import firebase from 'firebase';

  // Your web app's Firebase configuration
  const config = {
    apiKey: "AIzaSyAxRM8HSDpV_RwTN14SwCjD1lhSMx5uhOY",
    authDomain: "bingo-a8deb.firebaseapp.com",
    databaseURL: "https://bingo-a8deb.firebaseio.com",
    projectId: "bingo-a8deb",
    storageBucket: "bingo-a8deb.appspot.com",
    messagingSenderId: "416034194568",
    appId: "1:416034194568:web:768c821af94257205e8b3d",
    measurementId: "G-WJCJCPCB62"
  };

  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();

  export default firebase;
