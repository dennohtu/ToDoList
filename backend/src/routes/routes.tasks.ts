import * as express from 'express'
import { createTask, deleteTask, getAll, update } from '../controllers/controllers.tasks'

const router = express.Router()

router.route("/create").post(createTask)
router.route("/getAll").get(getAll)
router.route("/update/:id").put(update)
router.route("/delete/:id").delete(deleteTask)

export default router