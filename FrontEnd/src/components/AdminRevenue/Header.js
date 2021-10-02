import React from "react";
import {Link} from 'react-router-dom';


function Header() {
   return (
     <>
      <div className="container mt-5">
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <div className="container-fluid">
         <Link to="/admin/revenue" className="btn btn-outline-secondary" style={{margin:"10px"}}>Management Dashboard</Link>

           <button
             className="navbar-toggler"
             type="button"
             data-bs-toggle="collapse"
             data-bs-target="#navbarNavAltMarkup"
             aria-controls="navbarNavAltMarkup"
             aria-expanded="false"
             aria-label="Toggle navigation"
           >
             <span className="navbar-toggler-icon"></span>
           </button>
           <br></br>

           <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
             <div className="navbar-nav">
             
              <Link to="/admin/revenue" className="nav-link active">Home</Link>

              <Link to="/admin/revenue/add" className="nav-link">Issue Invoice</Link>

              <Link to="/admin/revenue/ViewInvoice" className="nav-link">All Invoices</Link>

              <Link to="/admin/" className="btn btn-warning" style={{marginLeft:"50px"}}>Back to Admin Panel</Link>




             </div>
           </div>
         </div>
       </nav>
       </div>
     </>
   );
}

export default Header;