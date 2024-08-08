"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.update = exports.getAll = exports.createTask = void 0;
var Joi = require("joi");
var sendResponse_1 = require("../utils/sendResponse");
var models_tasks_1 = require("../models/models.tasks");
var schema = Joi.object({
    title: Joi.string().alphanum().min(1).max(30).required(),
    status: Joi.string().allow(["new", "ongoing", "completed"])
});
var createTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error, userid, task, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                error = schema.validate(data).error;
                if (error) {
                    (0, sendResponse_1.default)(res, false, error.message);
                    return [2 /*return*/];
                }
                userid = req.userid;
                if (!userid) {
                    (0, sendResponse_1.default)(res, false, "Not authenticated");
                    return [2 /*return*/];
                }
                data.userId = userid;
                return [4 /*yield*/, models_tasks_1.default.create(data)];
            case 2:
                task = _a.sent();
                if (task) {
                    (0, sendResponse_1.default)(res, true, task.toJSON());
                    return [2 /*return*/];
                }
                (0, sendResponse_1.default)(res, false, "An error occured while saving task. Please try again");
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                (0, sendResponse_1.default)(res, false, err_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createTask = createTask;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, tasks, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userid = req.userid;
                if (!userid) {
                    (0, sendResponse_1.default)(res, false, "Not authenticated");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, models_tasks_1.default.find({ userId: userid })];
            case 1:
                tasks = _a.sent();
                (0, sendResponse_1.default)(res, true, tasks);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskid, error, task, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                taskid = req.params.id;
                error = schema.validate(req.body).error;
                if (error) {
                    (0, sendResponse_1.default)(res, false, error.message);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, models_tasks_1.default.findOneAndUpdate({ _id: taskid }, req.body, { new: true })];
            case 1:
                task = _a.sent();
                (0, sendResponse_1.default)(res, true, task.toJSON());
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                (0, sendResponse_1.default)(res, false, err_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var deleteTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskid, task, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                taskid = req.params.id;
                return [4 /*yield*/, models_tasks_1.default.findByIdAndDelete(taskid)];
            case 1:
                task = _a.sent();
                (0, sendResponse_1.default)(res, true, task.toJSON());
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                (0, sendResponse_1.default)(res, false, err_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteTask = deleteTask;
