import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDZT0_olgOcHRPQBUcxuq9IJqA0WrepuOA",
  authDomain: "react-native-chat-app-cl-62b08.firebaseapp.com",
  databaseURL: "https://react-native-chat-app-cl-62b08.firebaseio.com",
  projectId: "react-native-chat-app-cl-62b08",
  storageBucket: "react-native-chat-app-cl-62b08.appspot.com",
  messagingSenderId: "853606359410",
  appId: "1:853606359410:web:ddc976127dd5749113fdeb",
  measurementId: "G-Q1XRQX78D3"
};

export default Firebase.initializeApp(firebaseConfig);
