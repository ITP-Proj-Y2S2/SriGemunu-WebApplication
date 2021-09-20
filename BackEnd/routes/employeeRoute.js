const express = require ("express");
const router = express.Router();
const Employee = require('../models/Employee')

//importing controller from employees
const {getEmployee,addEmployee,updateEmployee,deleteEmployee,getEmployeeByID} = require("../controllers/employeeController")
//import {getEmployee} from "../controllers/employeeController"

//implementation is in controller
router.get("/get", getEmployee);

router.post("/add", addEmployee);

router.put("/update/:id", updateEmployee);

router.delete("/delete/:id", deleteEmployee);

router.get("/get/:id", getEmployeeByID)

module.exports = router;
