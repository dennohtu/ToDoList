import * as express from 'express'
import { createTask, deleteTask, getAll, update } from '../controllers/controllers.tasks'
import checkAuth from '../middleware/checkAuth'

const router = express.Router()

router.route("/create").post(checkAuth, createTask)
router.route("/getAll").get(checkAuth, getAll)
router.route("/update/:id").put(checkAuth, update)
router.route("/delete/:id").delete(checkAuth, deleteTask)

export default router