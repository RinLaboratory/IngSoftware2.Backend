const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

//  Consulta para registrar usuarios nuevos
app.use(require("./methods/register"));

// Consulta para obtener los usuarios
app.use(require("./methods/getuser"));

// consulta para loguearse
app.use(require("./methods/login"));

console.log("app is online")
app.listen(8000);