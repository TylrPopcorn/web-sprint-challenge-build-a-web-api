require('dotenv').config()


const express = require('express');
const cors = require("cors")
const server = express();

server.use(express.json())
server.use(cors())

const projectRouter = require("./projects/projects-router")
server.use("/api/projects", projectRouter)

const actionRouter = require("./actions/actions-router")
server.use("/api/actions", actionRouter)

server.use("/", (req, res) => {
    res.send(`<h1>Hello World!</h1>`)
})

module.exports = server



// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
