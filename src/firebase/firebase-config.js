import 'firebase/firestore';
import 'firebase/auth';
//Importacion de Funciones
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from 'firebase/auth';

//Configuracion Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD5Nu1wXRXYoa84l1YK9YZrLtn7gbTOjJs",
    authDomain: "journal-app-react-20aea.firebaseapp.com",
    projectId: "journal-app-react-20aea",
    storageBucket: "journal-app-react-20aea.appspot.com",
    messagingSenderId: "248623006180",
    appId: "1:248623006180:web:0a12f266c389fceb2147f1"
};

//Inicializar firebase
const app = initializeApp(firebaseConfig);

//Referencia a la base de datos
const db = getFirestore();

//Para autenticar con google
const googleAuthProvider = new GoogleAuthProvider();

export{
    db,
    googleAuthProvider
}

