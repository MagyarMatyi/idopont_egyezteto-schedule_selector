import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import { 
    getFirestore,
    collection,
    addDoc,
    getDocs
} 
from 
"https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";



// Firebase konfiguráció

const firebaseConfig = {

    apiKey: "AIzaSyAsC4xx9k5oZ7V7WGxuZ-6V4K6Cnd6VlJQ",

    authDomain: "schedule-selector.firebaseapp.com",

    projectId: "schedule-selector",

    storageBucket: "schedule-selector.firebasestorage.app",

    messagingSenderId: "694885826531",

    appId: "1:694885826531:web:e2a1e7e29e5671d74f2ad6",

    measurementId: "G-S56MWKRMWV"

};



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);





// Mentés

document.getElementById("save")
.addEventListener("click", async () => {


    const name =
        document.getElementById("name")
        .value
        .trim();



    if(name === ""){

        alert("Írd be a neved!");

        return;

    }



    let days = [];



    document
    .querySelectorAll(".day-checkbox")
    .forEach(box => {


        if(box.checked){

            days.push(box.value);

        }


    });



    if(days.length === 0){

        alert("Jelölj be legalább egy napot!");

        return;

    }




    try {


        await addDoc(
            collection(db, "jelentkezok"),
            {

                nev: name,

                napok: days,

                datum: new Date()

            }
        );



        document.getElementById("message")
        .innerHTML =
        "✅ Sikeresen mentve!";



        document.getElementById("name")
        .value = "";



        document
        .querySelectorAll(".day-checkbox")
        .forEach(box => {

            box.checked = false;

        });



    }

    catch(error){


        console.error(error);


        document.getElementById("message")
        .innerHTML =
        "❌ Hiba történt!";


    }


});







// Eredmények megjelenítése

document.getElementById("showResults")
.addEventListener("click", async ()=>{


    const results =
    document.getElementById("results");



    results.innerHTML =
    "Betöltés...";



    const snapshot =
    await getDocs(
        collection(db,"jelentkezok")
    );



    let html = `

    <table>

    <tr>

        <th>Név</th>

        <th>Elérhető napok</th>

    </tr>

    `;



    snapshot.forEach(doc=>{


        const adat =
        doc.data();



        html += `

        <tr>

            <td>
                ${adat.nev}
            </td>


            <td>
                ${adat.napok.join("<br>")}
            </td>


        </tr>

        `;


    });



    html += "</table>";



    results.innerHTML = html;



});
