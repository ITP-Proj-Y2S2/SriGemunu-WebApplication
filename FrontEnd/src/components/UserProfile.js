import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function UserProfile() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    return (
        <div className = "mt-5">
            <div className = "container pt-5">

            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Profile" key="1" >
                    <h1>Profile</h1>
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

    return (
        <div>
            
           <div className="row">
               <div class="col-md-6">
                   
                   {bookings && (bookings.map(booking =>{
                       return( 
                       <div className ="roombox m-4">
                        <h4>Room {booking.room}</h4>
                        <h5>Check in Date {booking.fromDate}</h5>
                        <h5>Check out Date {booking.toDate}</h5>
                        <h5>Booking status {booking.status && "confirmed" }</h5>
                        </div>
                        )  
                   }))}
                   
               </div>
           </div>
        </div>
    )
}

