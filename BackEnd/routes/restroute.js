const router = require("express").Router();
let Restaurant = require("../models/restaurant");

router.route("/add").post((req,res)=>{

    const item = req.body.item;
    const itemCat = req.body.itemCat;
    const itemno = Number(req.body.itemno);
    const price = Number(req.body.price);

    const newRestaurant = new Restaurant({
        item,
        itemCat,
        itemno,
        price
    })

    newRestaurant.save().then(()=>{
        res.json("Food Item Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/display").get((req,res)=>{

    Restaurant.find().then((restaurant)=>{
        res.json(restaurant)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route('/edit/:id').get((req, res) => {
    Restaurant.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  router.route('/update/:id').put((req, res, next) => {
    Restaurant.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Food Item updated successfully !')
      }
    })
  })
  
router.route("/delete/:id").delete(async (req,res) => {
    let foodId = req.params.id;

    await Restaurant.findByIdAndDelete(foodId).then(() => {
        res.status(200).send({status: "Food Item Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data",error: err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let foodId = req.params.id;
    await Restaurant.findById(foodId).then((fooditem) => {
        res.status(200).send({status: "Food Item Fetched", user : fooditem})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with fetching data",error: err.message});
    })
})



module.exports = router;