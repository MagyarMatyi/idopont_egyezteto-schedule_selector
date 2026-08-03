import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { 
    getFirestore, 
    collection, 
    addDoc 
} from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// Firebase beállítások

const firebaseConfig = {
    apiKey: "AIzaSyAsC4xx9k5oZ7V7WGxuZ-6V4K6Cnd6VlJQ",
    authDomain: "schedule-selector.firebaseapp.com",
    projectId: "schedule-selector",
    storageBucket: "schedule-selector.firebasestorage.app",
    messagingSenderId: "694885826531",
    appId: "1:694885826531:web:e2a1e7e29e5671d74f2ad6",
    measurementId: "G-S56MWKRMWV"
};


// Firebase indítása

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// Mentés gomb

document.getElementById("save").addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();


    if (name === "") {
        alert("Írd be a neved!");
        return;
    }


    let selectedDays = [];


    document.querySelectorAll(".day-checkbox").forEach((checkbox) => {

        if (checkbox.checked) {
            selectedDays.push(checkbox.value);
        }

    });



    if (selectedDays.length === 0) {
        alert("Jelölj be legalább egy napot!");
        return;
    }



    try {

        await addDoc(collection(db, "jelentkezok"), {

            nev: name,

            napok: selectedDays,

            datum: new Date()

        });


        document.getElementById("message").innerHTML =
            "✅ Sikeresen elmentve!";


        // mezők törlése

        document.getElementById("name").value = "";

        document.querySelectorAll(".day-checkbox")
            .forEach(cb => cb.checked = false);


    } catch (error) {

        console.error("Hiba:", error);

        document.getElementById("message").innerHTML =
            "❌ Hiba történt mentés közben.";

    }

});
