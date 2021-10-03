const router = require("express").Router();
let occasion = require ("../models/occasion");


router.route("/add").post((req,res)=>{

    const guests = Number(req.body.guests);
    const time = String(req.body.time);
    const email = String(req.body.email)
    const menu = String(req.body.menu);
    const type = String(req.body.type);
    const bookedDate = String(req.body.bookedDate);
    const userId = String(req.body.userId);




    const newOccasion = new occasion({
        guests,
        time,
        email,
        menu,
        type,
        bookedDate,
        userId
    
    })

    newOccasion.save().then(()=>{
        res.json("Event added")
    }).catch((err)=>{
        console.log(err);

    })

})


router.route("/").get((req,res)=>{
    occasion.find().then((occasions)=>{
        res.json(occasions)
        //console.log("ffff")
    }).catch((err)=>{
        //console.log("xxx")
        console.log(err)
    })
})




router.route("/update/:id").put(async(req,res)=>{
    let userid = req.params.id;
    const {time,email, guests, menu, type, bookedDate, userId}= req.body;

    const updateOccasion  = {
        guests,
        time, 
        email,
        menu,
        type,
        bookedDate,
        uerId
    }

    const update = await occasion.findByIdAndUpdate(userid, updateOccasion)
    .then(()=> {
        res.status(200).send({status: "event updated", user: update})
    }) .catch((err) => { 
        console.log(err);
        res.status(500).send({status:"error with updating", error: err.message});
    })
})


router.route("/delete/:id").delete(async (req,res) =>{
let userid = req.params.id;

await occasion.findByIdAndDelete(userid)
.then(()=> {
    res.status(200).send({status: "occasion deleted successfully"});
}) .catch((err) =>{
    console.log(err);
    res.status(500).send({status:"error with deleting", error: err.message});
})
})

router.route("/get/:id").get(async(req,res)=> {
    let userid= req.params.id; 
  const user=  await occasion.findById(userid)
   .then((user)=>{
       res.status(200).send({status: "occasion fetched", user})
   }).catch((err) =>{
       console.log(err);
       res.status(500).send({status:"error"});
   })
})



 


module.exports = router;