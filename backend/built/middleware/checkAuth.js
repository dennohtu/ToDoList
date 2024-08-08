"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var sendResponse_1 = require("../utils/sendResponse");
var jwt = require("jsonwebtoken");
function default_1(req, res, next) {
    try {
        var token = req.headers.authorization;
        if (!token) {
            (0, sendResponse_1.default)(res, false, "Not authorised");
            return;
        }
        var jwtToken = token.split(" ")[1];
        var data = jwt.verify(jwtToken, process.env.JWT_SECRET).toString();
        req.userid = data;
        next();
    }
    catch (err) {
        console.log(err);
        (0, sendResponse_1.default)(res, false, err.message);
    }
}
