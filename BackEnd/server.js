const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const errorHandler = require('./middleware/error');

const morgan = require("morgan"); 
app.use(morgan("dev"));

require("dotenv").config();


PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});


const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("Successfully conected to MongoDB");
})

app.listen(PORT,()=>{
    console.log(`Up and running on port ${PORT}`);
})

//Binath's Routes
const roomsRoute = require('./routes/roomsRoute')
app.use('/api/rooms',roomsRoute)

const bookingsRoute = require('./routes/bookingRoute')
app.use('/api/booking',bookingsRoute)

//Channu's Routes

const occasionRouter = require("./routes/occasions.js");
app.use("/occasion", occasionRouter)

//isi's Routes

const restaurantRouter = require("./routes/restroute.js")
app.use("/restaurant",restaurantRouter);

//Chamudi's part
const employeeRouter = require("./routes/employeeRoute.js");
app.use("/employee",employeeRouter);

//Yasas's part
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

//Chama's Routes
const invoiceRouter = require("./routes/invoices.js");
app.use("/invoice",invoiceRouter);


//Chama's viewAllPostData
app.post("/viewall", (req, res) => {
    res.status(200).send(req.body);
    console.log(req.body);
  });

  //shehan's import
  const maintenanceRouter = require ("./routes/Maintenances.js");

app.use("/maintenance", maintenanceRouter);