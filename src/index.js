const express = require("express");
const dotenv = require("dotenv");
const { google } = require("googleapis");
const axios = require("axios");

const { currentSession, equipment } = require("./routes");
const { CurrentSessionsModel } = require("./models");
const {
  CurrentSessionsController,
  EquipmentController,
  ClientController,
  ColoramaController,
} = require("./controllers/");

const app = express();
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api/get-current-sessions", currentSession);
app.use("/api/get-current-sessions/:id", CurrentSessionsController.getById);
app.use("/api/create-current-sessions", CurrentSessionsController.post);
app.use("/api/create-equipment", EquipmentController.post);
app.use("/api/stop-session/:id", CurrentSessionsController.stopSession);
app.use("/api/get-equipments/all", EquipmentController.get);
app.use("/api/get-equipments/:cat", EquipmentController.getByCategory);
app.use(
  "/api/update-equipments/:cat",
  EquipmentController.updateEquipmentByCategory
);
app.use("/api/get-equipments/byId/:id", EquipmentController.getById);
app.use("/api/get-only-equipments", EquipmentController.getOnlyEquipment);
app.use("/api/get-clients/all", ClientController.get);
app.use("/api/get-clients/:id", ClientController.getById);
app.use("/api/create-clients", ClientController.post);
app.use("/api/update-current-session/:id", CurrentSessionsController.update);
app.use("/api/update-equipment/:id", CurrentSessionsController.updateEquipment);
app.use("/api/clients", ClientController.get);
app.use("/api/coloramas", ColoramaController.get);
app.use("/api/create-colorama", ColoramaController.post);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

/**
 *
 * TEST
 */

// const requestData = {
//   id: "10101092392002",
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
//   // equipments: [
//   //   { equipment: "Equipment 1", quantity: 2 },
//   //   { equipment: "Equipment 2", quantity: 3 },
//   // ],
//   createdAt: "2022-01-01T00:00:00.000Z",
//   endAt: "2022-01-01T01:00:00.000Z",
//   updatedAt: new Date(),
// };

// // const data = JSON.stringify(requestData);

// axios.post("http://localhost:3000/api/create-current-sessions", requestData, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

/**
 * Test to add an equipment
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
//     const equipmentsCollection = collection(db, "coloramas");

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
//     const data = JSON.stringify(equipments);

//     // console.log("equipments:", equipments);
//   })

//   .catch((error) => {
//     console.error("Error:", error);
//   });

// const dataToSend = { name: "AA/LR6 X4", price: 10, qty: 0, cat: "consumables" };
// const test = [
//   {
//     name: "Lacie 2TB",
//     price: 149,
//     qty: 0,
//     cat: "consumables",
//   },
//   {
//     qty: 0,
//     price: 1,
//     name: "Coffee",
//     cat: "consumables",
//   },
//   {
//     name: "backdrop (FULL)",
//     price: 150,
//     qty: 0,
//     cat: "consumables",
//   },
//   {
//     price: 15,
//     name: "AA/LR6 Energizer",
//     qty: 0,
//     cat: "consumables",
//   },
//   {
//     name: "Cinéfoil (Meter)",
//     qty: 0,
//     price: 15,
//     cat: "consumables",
//   },
//   {
//     name: "Tea",
//     price: 1,
//     qty: 0,
//     cat: "consumables",
//   },
//   {
//     qty: 0,
//     name: "Tape",
//     price: 20,
//     cat: "consumables",
//   },
//   {
//     price: 10,
//     qty: 0,
//     name: "AAA/LR03 Energizer X4",
//     cat: "consumables",
//   },
//   {
//     name: "Sheets A4",
//     qty: 0,
//     price: 50,
//     cat: "consumables",
//   },
//   {
//     qty: 0,
//     name: "Color Gels (Meter)",
//     price: 18,
//     cat: "consumables",
//   },
//   {
//     price: 5,
//     name: "AA/LR03 X4",
//     qty: 0,
//     cat: "consumables",
//   },
//   {
//     price: 15,
//     qty: 0,
//     name: "Battery Set",
//     cat: "consumables",
//   },
//   {
//     name: "AA/LR6 X4",
//     price: 10,
//     qty: 0,
//     cat: "consumables",
//   },
// ];

// axios.post("http://localhost:3000/api/create-equipment", dataToSend, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axios.get("http://localhost:3000/api/get-equipments/all").then((res) => {
//   console.log(res.data);
// });

// axios.post("http://localhost:3000/api/create-clients", {
//   name: "John Doe",
//   address: "123 Main St",
//   phone: 555 - 555 - 5555,
//   siren: 123456789,
//   brand: "Brand",
//   email: "test@",
// });

// axios.get("http://localhost:3000/api/get-clients/all").then((res) => {
//   console.log(res.data);
// });

// axios.get("http://localhost:3000/api/get-only-equipments/").then((res) => {
//   console.log(res.data);
// });

// Test pour update une session en cours

// const requestData = [{ equipment: "Equipment 1", quantity: 2 }];

// const uuid = require("uuid");

// const testUpdate = {
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
//     { name: "TEST 900", quantity: 1 },
//     { name: "TEST", quantity: 0 },
//     { name: "TEST 902", quantity: 0 },
//   ],
// updatedAt: new Date(),
// createdAt: "2022-01-01T00:00:00.000Z",
// };

// const data = JSON.stringify(testUpdate);

// axios.post("http://localhost:3000/api/update-current-session/1", data, {
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axios
//   .get(
//     "http://localhost:3000/api/get-current-sessions/b9c94b8c-6265-4aea-aae9-1cc8d4478434"
//   )
//   .then((res) => {
//     console.log(res.data);
//   });

// axios.get("http://localhost:3000/api/get-current-sessions").then((res) => {
//   console.log(res.data);
// });

// axios.get("http://localhost:3000/api/get-equipments/cameras").then((res) => {
//   console.log(res.data);
// });
