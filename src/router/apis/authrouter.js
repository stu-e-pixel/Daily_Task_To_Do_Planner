const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/Apis/AuthController')
const Validation = require('../../validate/index')
const UserSchemaValidation = require('../../validate/UserSchemaValiadtion')
const LabelSchemaValidation = require('../../validate/LabelSchemaValidation')
const CategorySchemaValidation = require('../../validate/CategorySchemaValidation')
const ReminderSchemaValidation = require('../../validate/ReminderSchemaValidation')
const TaskSchemaValidation = require('../../validate/TaskSchemaValidation')
const OtpSchemaValidation = require('../../validate/OtpSchemaValidation')
const upload = require('../../utils/multer');
const AuthMiddleware = require('../../middleware/AuthMiddleware')
const TaskController = require('../../controller/Apis/TaskController');
const LabelController = require('../../controller/Apis/LabelController')
const CategoryController = require('../../controller/Apis/CategoryController')
const ReminderController = require('../../controller/Apis/ReminderController')
const ReportController = require('../../controller/Apis/ReportController')

router.post("/createuser",upload.single('image'),Validation.validate(UserSchemaValidation.signup),AuthController.signup)
router.post("/verify",Validation.validate(OtpSchemaValidation.verifyOtp),AuthController.verify);
router.post("/login",Validation.validate(UserSchemaValidation.login),AuthController.login)
router.get("/profile",AuthMiddleware.verifyToken,AuthController.dashboard)
router.put("/updateuser/profile/:id",upload.single('image'),AuthMiddleware.verifyToken,AuthController.updateProfile)
router.post("/create/task",Validation.validate(TaskSchemaValidation.createTask),AuthMiddleware.verifyToken,TaskController.createTask)
router.put("/update/task/:id",Validation.validate(TaskSchemaValidation.updateTask),AuthMiddleware.verifyToken,TaskController.updateTask)
router.delete("/delete/task/:id",AuthMiddleware.verifyToken,TaskController.deleteTask)
router.get("/getTasks",AuthMiddleware.verifyToken,TaskController.getTask)
router.post("/create/label",Validation.validate(LabelSchemaValidation.createLabel),AuthMiddleware.verifyToken,LabelController.createLabel)
router.put("/update/label/:id",Validation.validate(LabelSchemaValidation.updateLabel),AuthMiddleware.verifyToken,LabelController.updateLabel)
router.get("/getLabel",AuthMiddleware.verifyToken,LabelController.getLabels);
router.delete("/delete/label/:id",AuthMiddleware.verifyToken,LabelController.deleteLabel);
router.post("/create/category",Validation.validate(CategorySchemaValidation.createCategory),AuthMiddleware.verifyToken,CategoryController.createCategory);
router.put("/update/category/:id",Validation.validate(CategorySchemaValidation.updateCategory),AuthMiddleware.verifyToken,CategoryController.updateCategory);
router.get("/getCategory",AuthMiddleware.verifyToken,CategoryController.getCategory);
router.delete("/delete/category/:id",AuthMiddleware.verifyToken,CategoryController.deleteCategory);
router.post("/reminder/create",Validation.validate(ReminderSchemaValidation.createReminder),AuthMiddleware.verifyToken,ReminderController.createReminder)
router.put("/reminder/update/:reminderId",Validation.validate(ReminderSchemaValidation.updateReminder),AuthMiddleware.verifyToken,ReminderController.updateReminder);
router.delete("/reminder/delete/:reminderId",AuthMiddleware.verifyToken,ReminderController.deleteReminder);
router.get("/getReminders",AuthMiddleware.verifyToken,ReminderController.getReminders)
router.get("/task/summary",AuthMiddleware.verifyToken,ReportController.taskSummary);
router.get("/task/static",AuthMiddleware.verifyToken,ReportController.taskStatistics)


module.exports=router