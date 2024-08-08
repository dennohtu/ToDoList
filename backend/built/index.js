"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bodyParser = require("body-parser");
var dotenv = require("dotenv");
var express = require("express");
var cors = require("cors");
var routes_tasks_1 = require("./routes/routes.tasks");
dotenv.config();
var app = express();
var mongoString = process.env.MONGO_URL;
mongoose_1.default.connect(mongoString);
var database = mongoose_1.default.connection;
database.on("error", function (error) {
    console.error(error);
});
database.once("connected", function () {
    console.log("Database connected");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use("api/tasks", routes_tasks_1.default);
app.listen(process.env.PORT, function () {
    console.log("Server connected on port ".concat(process.env.PORT));
});
