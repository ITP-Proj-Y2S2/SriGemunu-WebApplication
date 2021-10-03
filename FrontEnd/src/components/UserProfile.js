import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import { Tag, Divider } from 'antd';
import Swal from "sweetalert2"

const { TabPane } = Tabs;

function UserProfile() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    return (
        <div className = "mt-5">
            <div className = "container pt-5">

            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Profile" key="1" >
                   <MyProfile/>
                </TabPane>
                <TabPane tab="Room Bookings" key="2">
                <UserBookings/>
                </TabPane>
                <TabPane tab="Special Occassion Bookings" key="3">
                <h1>Special Occassion Bookings</h1>
                </TabPane>
            </Tabs>
            </div>
        </div>
    )
}

export default UserProfile;


export function UserBookings() {
const user = JSON.parse(localStorage.getItem("currentUser"))
const [bookings, setBookings] = useState([])

useEffect(async () => {
    try {
        const data = await (await (axios.post("http://localhost:8070/api/booking/getuserbooking", {userId : user._id}))).data;
        console.log(data)
        // console.log(user._id)
        setBookings(data)

    } catch (error) {
        console.log(error)
        
    }
  
}, [])

function cancelBooking(id){
    // console.log(id)
    // console.log(bookings)
    axios.delete(`http://localhost:8070/api/booking/delete/${id}`).then(() => Swal.fire("Success" , "Booking Cancelled", "success")).then(()=>{ window.location.href = "http://localhost:3000/user/userprofile"});
    
  }

    return (
        <div>
            
           <div className="row justify-content-center">
               <div class="col-md-6">
                   
                   {bookings && (bookings.map(booking =>{
                       return( 
                       <div className ="roombox m-4 p-3">
                        <h5>{booking.room}</h5>
                        <p><b>Check in Date : </b>{booking.fromDate}</p>
                        <p><b>Check out Date : </b> {booking.toDate}</p>
                        <p><b>Booking status : </b>{booking.status == "cancelled" ?  <Tag color="orange">cancelled</Tag> :<Tag color="cyan">Success</Tag> }</p>

                        {booking.status == "cancelled" ? "cancelled" : <div className = "text-right">
                            <button className = "btn btn-dark" onClick = {()=>{cancelBooking(booking._id)}}>Cancel</button>
                        </div>}
                        

                        </div>
                        )  
                   }))}

               </div>
           </div>
         
        </div>
    )
}


export function MyProfile() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
 
        return (
            <div>
                <h1>My Profile</h1>
              
            </div>
        )
    }

