const router = require("express").Router();
const { response } = require("express");
let Maintenance = require("../models/Maintenance");

router.route("/add").post ((req,res) =>{
    const title = String(req.body.title);
    const description = String(req.body.description);
    const highPriority = Boolean(req.body.highPriority);

    const newRequest = new Maintenance({

        title,
        description,
        highPriority
 
    })

    newRequest.save().then(()=>{
        res.json("Request added")
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/").get((req,res)=>{
    Maintenance.find().then((Maintenances)=>{
        res.json(Maintenances)
    }).catch((err)=>{
        console.log(err)
    })
})



router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;

    const {title,description,highPriority} = req.body;

    const updateRequest ={
        title,
        description,
        highPriority
    }
 
    const update = await Maintenance.findByIdAndUpdate(userId, updateRequest).then(()=>{
    
        res.status(200).send({status: "Request updated"});

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "error updating", error:err.message});
    })
})

router.route("/delete/:id").delete(async (req,res) => {
    let userId = req.params.id;

    await Maintenance.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Request removed"});
    }).catch((err)=> {
        console.log(err.message);
        res.status(500).send({status: "Error deleting request", error: err.message});
    })
})

router.route("/get/:id").get(async (req, res) => {
    console.log(req.params.id)
    let userId = req.params.id;
    const user = await Maintenance.findById(userId).then((Maintenance) => {
        res.status(200).send({status: "Request Fetched",Maintenance });
    }).catch(()=> {
        console.log(err.message);
        res.status(500).send({status: "Error fetching Request", error: err.message});
    })
})

/*router.route("/").get((req,res)=>{
    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})*/



module.exports = router;
