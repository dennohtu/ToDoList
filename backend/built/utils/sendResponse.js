"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendResponse;
function sendResponse(res, success, data) {
    res.status(success ? 200 : 400).send({ success: success, data: success ? data : { errMsg: data } });
}
