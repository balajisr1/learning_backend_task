const express = require("express")
const { FileEdit } = require("./fileEdit")

const routes = express.Router()

routes.use("/file", FileEdit)

module.exports = { routes }