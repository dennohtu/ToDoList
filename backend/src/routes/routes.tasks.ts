import * as express from "express";
import checkAuth from "../middleware/checkAuth";
import {
  createTask,
  deleteTask,
  getAll,
  update,
  updateMany,
} from "../controllers/controllers.tasks";

const router = express.Router();

router.route("/create").post(checkAuth, createTask);
router.route("/getAll").get(checkAuth, getAll);
router.route("/update/:id").put(checkAuth, update);
router.route("/updateMany").put(checkAuth, updateMany);
router.route("/delete/:id").delete(checkAuth, deleteTask);

export default router;
