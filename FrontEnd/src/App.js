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
import UserProfile from './components/UserProfile';
import UpdateRoom from "../src/Admin/UpdateRoom"

//channu's imports

import AddOccasion from './specialOccasion/AddOccasion';
import OccasionType from './specialOccasion/OccasionType';
import OccasionHome from './specialOccasion/OccasionHome';
import ViewOccasion from './specialOccasion/ViewOccasion';
import AdminOccasion from './AdminSpecialOccasion/AdminOccasion';
import ChangeOccassion from './specialOccasion/ChangeOccassion';


//Isi's imports
import RestNavbar from "./RestaurantComponents/RestNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Report from "./RestaurantComponents/ReportGen";
import Contact from "./pages/Contact";
import AddFood from "./RestaurantComponents/AddFood";
import RetrFood from "./RestaurantComponents/RetrFood";
import EditFood from "./RestaurantComponents/EditFood";
import Menu from "./RestaurantComponents/CustomerRetr";

//Chamudi's imports
import EmpMain from './Employee/EmployeeMain';
import AddEmployee from './Employee/AddEmployee';
import GetEmployee from "./Employee/GetEmployee";
import EditEmployee from "./Employee/EditEmployee";




//Yasas's imports
//Routing
import PrivateRoute from './routing/PrivateRoute'; 

//Screens
import PrivateScreen from './components/usermanagement/PrivateScreen';
import LoginScreen from './components/usermanagement/LoginScreen';
import RegisterScreen from './components/usermanagement/RegisterScreen';
import ForgotPasswordScreen from './components/usermanagement/ForgotPasswordScreen';
import ResetPasswordScreen from './components/usermanagement/ResetPasswordScreen';

//chama's imports

import CounterClass from './components/AdminRevenue/CounterClass';
import CounterFunc from './components/AdminRevenue/CounterFunction';
import HeaderRevenue from './components/AdminRevenue/Header';
import Addinvoice from './components/AdminRevenue/Addinvoice'

import AllInvoices from './components/AdminRevenue/AllInvoices';
import HomeRevenue from './components/AdminRevenue/Home';
import Update from './components/AdminRevenue/Update';
import ViewInvoice from './components/AdminRevenue/ViewInvoice';
import Clock from './components/AdminRevenue/Clock';
import Cards from './components/AdminRevenue/Cards';
import CustomerInvoice from './components/AdminRevenue/CustomerInvoice';
import Data from './components/AdminRevenue/Data';
import tempCus from './components/AdminRevenue/tempCus';
import Admin from './components/AdminRevenue/Admin';
import TempChart from './components/AdminRevenue/TempChart'


//import Motion from './components/AdminRevenue/Motion';




function App() {
  return (

    <div className="App">

      <Router>
        <Navbar/>
        <Route path="/" exact component={Homepage} />

        {/* binath's imports */}
        <Route path="/admin/rooms" exact component={Homescreen} />
        <Route path="/admin/addRoom" exact component={AddRoom} />
        <Route path="/admin/UpdateRoom" exact component={UpdateRoom} />
        <Route path="/booking/BookingAvailability" exact component={BookingScreen} />
        <Route path="/booking/BookingAvailability/RoomAvailibilty/:room/:basis/:fromDate/:toDate" exact component={RoomAvailibilty} />
        <PrivateRoute path="/booking/BookingAvailability/BookingConfirmation" exact component={BookingConfirmation} />
        <Route path="/admin/bookings" exact component={AllBookings} />
        <PrivateRoute path="/user/userprofile" exact component={UserProfile} />
        
        



        {/* Channu's imports */}
        <Route path="/specialoccasion/OccasionHome" exact component={OccasionHome} />
        <Route path="/specialoccasion/OccasionHome/ViewOccasion" exact component={ViewOccasion} />
        <Route path="/specialoccasion/OccasionHome/OccasionType" exact component={OccasionType} />
        <Route path="/specialoccasion/OccasionHome/OccasionType/AddOccasion/:eventtype" exact component={AddOccasion} />
        <Route path="/specialoccasion/OccasionHome/OccasionType/AddOccasion" exact component={AddOccasion} />
        <Route path="/admin/occasion/" exact component={AdminOccasion} />
        <Route path="/specialoccasion/OccasionHome/ViewOccasion/Change/:id" exact component={ChangeOccassion} />
       

        {/* Isi's Imports   */}
        <Route path="/restaurant" exact component={Home} />
        <Route path="/restaurant/about" exact component={About} />
        <Route path="/restaurant/contact" exact component={Contact} />
        <Route path="/restaurant/addfood" exact component={AddFood} />
        <Route path="/restaurant/admin/retrfood" exact component={RetrFood} />
        <Route path="/restaurant/report" exact component={Report} />
        <Route path="/restaurant/menu" exact component={Menu} />
        <Route path="/restaurant/editfood/:id" exact component={EditFood} />


        {/* Chamudi's imports */}
        
        <Route path = "/admin/employee/addEmp" exact component={AddEmployee}/>
        <Route path="/admin/employee/getEmp" exact component={GetEmployee} />
        <Route path="/admin/employee/editEmp/:id" exact component={EditEmployee} />
        <Route path="/admin/employee" exact component={EmpMain} />
       


        {/* Yasas */}
        <PrivateRoute exact path="/privatescreen" component={PrivateScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>

        {/*chama's imports*/}
        
        <Route path="/admin/" exact component={Admin} />
        <Route path={["/admin/revenue","/admin/revenue/add","/admin/revenue/ViewInvoice","/admin/revenue/ViewInvoice/CustomerInvoice/:id"]} exact component={HeaderRevenue}/>
        <Route path={["/admin/revenue","/admin/revenue/Clock"]} exact component={Clock}/>
        <Route path="/admin/revenue/Home" exact component={HomeRevenue}/>   
        <Route path="/admin/revenue/TempCus" exact component={tempCus}/>  
        <Route path="/admin/revenue/ViewInvoice" exact component={ViewInvoice}/>
        <Route path="/admin/revenue/" exact component={HomeRevenue}/>
        <Route path="/admin/revenue/ViewInvoice/CustomerInvoice/:id?" exact component={CustomerInvoice}/>
        <Route path="/admin/revenue/add" exact component={Addinvoice} />
        <Route path="/admin/revenue/ViewInvoice/CustomerInvoice/:id/Update" exact component={Update}/>  
        <Route path="/admin/revenue/TempChart" exact component={TempChart}/>

    
    

        <Footer />
      </Router>
    </div>
  );
}

export default App;
