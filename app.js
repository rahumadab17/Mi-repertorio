const express = require('express');
const chalk = require('chalk');
const { insertarCancion, consultarCanciones, editarCancion, eliminarCancion } = require('./consultas.js');
const app = express();

const port = 3000;

app.listen(port, console.log(chalk.greenBright.bold(`Server ON in port ${port}`)));

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/cancion", async (req, res) => {
    try {
        const datos = Object.values(req.body);

        const result = await insertarCancion(datos);
        res.json(result);
    } catch (error) {
        const { code } = error;
        console.log(`No se pudo insertar la canción debido al error N°: ${code}`);
        console.log(error);
    }
});

app.get("/canciones", async (req, res) => {
    try {
        const obtenerCanciones = await consultarCanciones();
        res.json(obtenerCanciones);
    } catch (error) {
        const { code } = error;
        console.log(`No se pudo encontrar las canciones debido al error N°: ${code}`);
    }
});

app.put("/cancion", async (req, res) => {
    try {
        const { id } = req.query
        const datos = Object.values(req.body);

        const result = await editarCancion(id, datos)
        res.json(result);
    } catch (error) {
        const { code } = error;
        console.log(`No se pudo actualizar la canción debido al error N°: ${code}`);
    }
});

app.delete("/cancion", async (req, res) => {
    try {
        const { id } = req.query
        const result = await eliminarCancion(id)
        res.json(result)
    } catch (error) {
        const { code } = error;
        console.log(`No se pudo eliminar la canción debido al error N°: ${code}`);
    }
});