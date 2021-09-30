import './App.css';
import Navbar from './components/Navbar';

import Footer from "../src/components/HomeFooter"
import Homepage from "./components/Homepage";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//binath's imports

import Homescreen from './Admin/AdminRooms';
import AddRoom from "../src/Admin/AddRoom"
import BookingScreen from './booking/BookingScreen';
import RoomAvailibilty from './booking/RoomAvailibilty';
import BookingConfirmation from "./booking/BookingConfirmation";
import AllBookings from './Admin/AdminBooking';

//channu's imports

import AddOccasion from './specialOccasion/AddOccasion';
import OccasionType from './specialOccasion/OccasionType';
import OccasionHome from './specialOccasion/OccasionHome';
import ViewOccasion from './specialOccasion/ViewOccasion';
import AdminOccasion from './AdminSpecialOccasion/AdminOccasion';

//Isi's imports
import RestNavbar from "./RestaurantComponents/RestNavbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AddFood from "./RestaurantComponents/AddFood";
import RetrFood from "./RestaurantComponents/RetrFood";
import EditFood from "./RestaurantComponents/EditFood";

//Chamudi's imports
import EmpMain from './Employee/EmployeeMain';
import AddEmployee from './Employee/AddEmployee';
import GetEmployee from "./Employee/GetEmployee";
import EditEmployee from "./Employee/EditEmployee";



function App() {
  return (

    <div className="App">

      <Router>
        <Navbar/>
        <Route path="/" exact component={Homepage} />

        {/* binath's imports */}
        <Route path="/admin/rooms" exact component={Homescreen} />
        <Route path="/admin/addRoom" exact component={AddRoom} />
        <Route path="/booking/BookingAvailability" exact component={BookingScreen} />
        <Route path="/booking/BookingAvailability/RoomAvailibilty/:room/:basis/:fromDate/:toDate" exact component={RoomAvailibilty} />
        <Route path="/booking/BookingAvailability/BookingConfirmation" exact component={BookingConfirmation} />
        <Route path="/admin/bookings" exact component={AllBookings} />



        {/* Channu's imports */}
        <Route path="/specialoccasion/OccasionHome" exact component={OccasionHome} />
        <Route path="/specialoccasion/OccasionHome/ViewOccasion" exact component={ViewOccasion} />
        <Route path="/specialoccasion/OccasionHome/OccasionType" exact component={OccasionType} />
        <Route path="/specialoccasion/OccasionHome/OccasionType/AddOccasion/:eventtype" exact component={AddOccasion} />
        <Route path="/specialoccasion/OccasionHome/OccasionType/AddOccasion" exact component={AddOccasion} />
        <Route path="/admin/occasion/" exact component={AdminOccasion} />
       

        {/* Isi's Imports   */}
        {/* <RestNavbar/> */}
        {/* <Route path="/restaurant" exact component={RestNavbar} /> */}
        <Route path="/restaurant" exact component={Home} />
        <Route path="/restaurant/menu" exact component={Menu} />
        <Route path="/restaurant/about" exact component={About} />
        <Route path="/restaurant/contact" exact component={Contact} />
        <Route path="/restaurant/addfood" exact component={AddFood} />
        <Route path="/restaurant/retrfood" exact component={RetrFood} />
        <Route path="/restaurant/editfood/:id" exact component={EditFood} />


        {/* Chamudi's imports */}
        
        <Route path = "/admin/employee/addEmp" exact component={AddEmployee}/>
        <Route path="/admin/employee/getEmp" exact component={GetEmployee} />
        <Route path="/admin/employee/editEmp" exact component={EditEmployee} />
        <Route path="/admin/employee" exact component={EmpMain} />

        <Footer />
      </Router>
    </div>
  );
}

export default App;
