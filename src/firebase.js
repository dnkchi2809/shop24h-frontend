import firebase from "firebase";

import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBBw-kyNBZq_WTqL9CHgD32xggeJVUEV10",
    authDomain: "devcamp-shop-24h-af262.firebaseapp.com",
    projectId: "devcamp-shop-24h-af262",
    storageBucket: "devcamp-shop-24h-af262.appspot.com",
    messagingSenderId: "701619350327",
    appId: "1:701619350327:web:b3351448e84d4ffd7148b2"
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();