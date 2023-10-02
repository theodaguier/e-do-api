const express = require("express");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const axios = require("axios");

const { currentSession, equipment } = require("./app/routes");
const { CurrentSessionsModel } = require("./app/models");
const {
  CurrentSessionsController,
  EquipmentController,
} = require("./app/controllers/");

const app = express();
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api/get-current-sessions", currentSession);
app.use("/api/create-current-sessions", CurrentSessionsController.post);
app.use("/api/get-equipments", EquipmentController.get);
app.use("/api/create-equipment", EquipmentController.post);
app.use("/api/get-equipments/:cat", EquipmentController.getByCategory);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

/**
 *
 * TEST
 */
// const requestData = {
//   newId: "1",
//   client: {
//     address: "123 Main St",
//     name: "John Doe",
//     phone: "555-555-5555",
//     siren: "123456789",
//   },
//   reservations: [
//     { hours: 1, machine: "Machine 1" },
//     { hours: 2, machine: "Machine 2" },
//   ],
//   equipments: [
//     { equipment: "Equipment 1", quantity: 2 },
//     { equipment: "Equipment 2", quantity: 3 },
//   ],
//   createdAt: "2022-01-01T00:00:00.000Z",
//   endAt: "2022-01-01T01:00:00.000Z",
// };

// const data = JSON.stringify(requestData);

// axios.post("http://localhost:3000/api/create-current-sessions", data, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/**
 * Test to end an equipment
 */

// requestData.forEach((equipment) => {
//   axios
//     .post("http://localhost:3000/api/create-equipment", equipment, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => {
//       console.log("Réponse du serveur:", response.data);
//     })
//     .catch((error) => {
//       console.error("Erreur lors de l'envoi de la requête POST:", error);
//     });
// });
// axios
//   .post("http://localhost:3000/api/create-equipment", data, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then((response) => {
//     console.log("Réponse du serveur:", response.data);
//   })
//   .catch((error) => {
//     console.error("Erreur lors de l'envoi de la requête POST:", error);
//   });

// Get all eq

// const { initializeApp } = require("firebase/app");
// const { getFirestore, collection, getDocs } = require("firebase/firestore");
// const firebaseConfig = {
//   apiKey: "AIzaSyBPwIfYSTkFz_vqsPRA5usrMnShX0Dpehg",
//   authDomain: "e-do-app.firebaseapp.com",
//   databaseURL: "https://e-do-app-default-rtdb.firebaseio.com",
//   projectId: "e-do-app",
//   storageBucket: "e-do-app.appspot.com",
//   messagingSenderId: "837844582989",
//   appId: "1:837844582989:web:b69c8ef3c8cb57b5a31204",
//   measurementId: "G-336SMPWSTW",
// };
// const appFirebase = initializeApp(firebaseConfig);
// const db = getFirestore(appFirebase);

// const equipments = [];
// async function getEquipmentFromFirebase() {
//   try {
//     // Reference the "equipments" collection correctly using the db instance
//     const equipmentsCollection = collection(db, "equipments");

//     const equipmentsSnapshot = await getDocs(equipmentsCollection);

//     equipmentsSnapshot.forEach((doc) => {
//       equipments.push(doc.data());
//     });

//     return equipments;
//   } catch (error) {
//     console.error("Error fetching equipment data:", error);
//     throw error;
//   }
// }

// getEquipmentFromFirebase()
//   .then((equipments) => {
//     console.log("equipments:", equipments);
//   })

//   .catch((error) => {
//     console.error("Error:", error);
//   });

// axios.post("http://localhost:3000/api/create-equipment", equipments, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Test pour récupérer un équipement selon sa catégorie

axios.get("http://localhost:3000/api/get-equipments/cameras").then((res) => {
  console.log("res:", res.data);
});
