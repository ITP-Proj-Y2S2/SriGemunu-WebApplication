const express = require("express");
const Employee = require('../models/Employee');


//Get Employees 
const getEmployee = async (req, res) => {
    try {
        const employees = await Employee.find({})
//return res.json({ Employee });
        res.send(employees)
    } catch(error){
        return res.status(400).json({message: error})
    }
}

//Add Employees
 const addEmployee = async (req, res) => {
     try {
        const {firstName,lastName,contactNumber,address,NIC,email,employeeType,salary,availability} = req.body;

        const newEmployee = new Employee({
           firstName,
           lastName,
           contactNumber,
           address,
           NIC,
           email,
           employeeType,
           salary,
           availability
         });

         newEmployee.save().then(()=>{
            res.json("Employee added")
         })

     } catch (error) {
        console.log(error)
     }
 }


//Update Employees
const updateEmployee = async (req,res)=>{
    try {
      let Eid = req.params.id;

      const {
        firstName,
        lastName,
        contactNumber,
        address,
        NIC,
        email,
        employeeType,
        salary,
        availability
      } = req.body;

      const updateEmployee = {
        firstName,
        lastName,
        contactNumber,
        address,
        NIC,
        email,
        employeeType,
        salary,
        availability
      };

      const update = await Employee.findByIdAndUpdate(Eid, updateEmployee).then(
        () => {
          res.status(200).send({ status: "Employee updated" });
        }
      );

    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error updating", error: err.message });
    }
}


//Delete Employee
const deleteEmployee = async (req,res) =>{
    let Eid =  req.params.id;

    await Employee.findByIdAndDelete(Eid).then(()=>{

        res.status(200).send({status: "success delete"});

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "failed to delete", error: err.message})
    })
}

//Get specific Employee
const getEmployeeByID = async (req, res) => {
  let Eid = req.params.id;

  try {
    const employee = await Employee.findById(Eid);
//return res.json({ Employee });
    res.send(employee);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};


module.exports = {getEmployee,addEmployee,updateEmployee,deleteEmployee,getEmployeeByID};

