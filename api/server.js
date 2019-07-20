const express = require("express")

const helmet = require("helmet")

const CategoriesRouter = require("./categories/categories-router")
const TasksRouter = require("./tasks/tasks-router")

const server = express();

server.use(helmet())
server.use(express.json())
server.use("./categories", CategoriesRouter)
server.use("./tasks", TasksRouter)

server.get("/", (req, res)=> {
    res.send(`Server Running`)
})

module.exports = server;