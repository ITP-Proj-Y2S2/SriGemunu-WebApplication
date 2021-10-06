import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Tabs } from 'antd';
import { Tag, Divider } from 'antd';
import Swal from "sweetalert2"

const { TabPane } = Tabs;

function UserProfile() {
    const user = JSON.parse(localStorage.getItem("currentUser"))

    return (
        <div className="mt-5">
            <div className="container pt-5">

                <Tabs defaultActiveKey="2 " size="large" centered>
                    <TabPane tab="Profile" key="1" >
                        <MyProfile />
                    </TabPane>
                    <TabPane tab="Room Bookings" key="2">
                        <UserBookings />
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
    const [rooms, setRooms] = useState([])

    useEffect(async () => {
        try {
            const data = await (await (axios.post("http://localhost:8070/api/booking/getuserbooking", { userId: user._id }))).data;
            //console.log(data)
            // console.log(user._id)
            setBookings(data)
            const roomsObj = (await axios.get("/api/rooms/getallrooms")).data;
            // console.log(data);
            setRooms(roomsObj);

        } catch (error) {
            console.log(error)

        }

    }, [])

    function cancelBooking(id) {
        // console.log(id)
        // console.log(bookings)

        Swal.fire({
            title: "Are you sure you want to cancel this booking?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d9534f",
            cancelButtonColor: "#292b2c",
            confirmButtonText: "Yes, cancel booking!",
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/api/booking/delete/${id}`).then(() => Swal.fire("Success", "Booking Cancelled", "success")).then(() => { window.location.href = "http://localhost:3000/user/userprofile" });
            }
          });
        }
     

    return (
        <div>
            
            <div>
                <h3  align = "center">Hello, {user.cusname}!</h3>
                <h5  align = "center">You can find all your bookings below</h5>
            </div>
            <div className="row justify-content-center" style ={{marginBottom: "300px"}}>
                <div class="col-md-8">

                    {bookings && (bookings.map(booking => {
                        
                        rooms.map((room)=>{
                            if(booking.roomId == room._id){
                                booking.roomImg = room.imageurls[0]
                                booking.roomType =  room.type
                            }
                        })
                        //console.log(booking.fromDate)


                        return (
                            <div className=" row roombox m-4 p-3">
                                <div className="col-md-5 ">
                                    <img src={booking.roomImg} className="smallimage " alt="" />
                                </div>
                                <div className="col-md-5 ">
                                <h5>{booking.room}</h5>
                                <p><b>Room Type : </b>{booking.roomType}</p>
                                <p><b>Check in Date : </b>{booking.fromDate}</p>
                                <p><b>Check out Date : </b> {booking.toDate}</p>
                                <p><b>Booking status : </b>{booking.status == "cancelled" ? <Tag color="orange">cancelled</Tag> : <Tag color="cyan">Success</Tag>}</p>

                                {booking.status == "cancelled" ? "" : <div className="text-right">
                                    <button className="btn btn-dark btn-block" onClick={() => { cancelBooking(booking._id) }}>Cancel Booking</button>
                                </div>}

                                </div>


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
    const [userobj, setUserobj] = useState([])


    useEffect(async () => {
        try {
            const data = await (await (axios.get(`http://localhost:8070/api/auth/user/${user._id}`))).data;
            //console.log(data)
            setUserobj(data)

        } catch (error) {
            console.log(error)

        }

    }, [])

    function deleteAccount() {
        axios.delete(`http://localhost:8070/api/auth/user/delete/${user._id}`).then(() => alert("Account Deleted")).then(() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("_id");
            localStorage.removeItem("currentUser");
            window.location.href = "/"
        }
        );

    }

        return (
            <div className = "shadow-lg p-3 mb-5 bg-white rounded">
                <div style = {{ paddingLeft:"30px"}} classsName = "container mb-5">
                <h2 style = {{paddingTop:"30px", paddingBottom:"25px", textAlign:"center"}}>My Profile</h2>
                <p style = {{paddingLeft:"50px", paddingBottom:"12px", fontSize:"18px"}}><b style = {{paddingRight:"103px"}}> Name : </b>{userobj.cusname}</p>
                <p style = {{paddingLeft:"50px", paddingBottom:"12px", fontSize:"18px"}}><b style = {{paddingRight:"108px"}}> Email : </b>{userobj.email}</p>
                <p style = {{paddingLeft:"50px", paddingBottom:"12px", fontSize:"18px"}}><b style = {{paddingRight:"65px"}}> Username : </b>{userobj.username}</p>
                <p style = {{paddingLeft:"50px", paddingBottom:"12px", fontSize:"18px"}}><b style = {{paddingRight:"60px"}}> Telephone : </b>{userobj.telnum}</p>

                <div className = "md-5"  style = {{marginBottom:"200px", paddingLeft:"45px"}}>
                    <button style = {{paddingLeft:"10px", paddingBottom:"10px", paddingTop:"10px", fontSize:"15px"}} className = "btn btn-danger" onClick = {()=>{deleteAccount()}}> <i className ="far fa-trash-alt"></i>&nbsp;&nbsp;Delete Account</button>
                </div>


                </div>

            </div>
    )
}

