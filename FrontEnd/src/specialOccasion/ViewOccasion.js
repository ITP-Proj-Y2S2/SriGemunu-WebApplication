import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from "react-router-dom";
import './EventDesign.css';

export default function ViewOccasion() {
    return(
        <div className = "bgimg textCenter">
            <div className="d-flex justify-content-center p-5"></div>
            <h1 className="display-1" style={{color:"white"}}>Your Events</h1>
            <div  className = "container">
            <SpecialOccassion/>
            </div>
        </div>
    )
    }

    export function SpecialOccassion() {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        console.log(user._id)
        const [occasions, setOccasions] = useState([])
        
        useEffect(async () => {
            try {
                const data = await (await (axios.get(`http://localhost:8070/occasion/get/${user._id}`)));
                console.log(data.data.occasionObj)
                console.log(data)
                // console.log(user._id)
                setOccasions(data.data.occasionObj)
                //console.log(occasions)
        
            } catch (error) {
                console.log(error)
                
            }
          
        }, [])
        
        // function cancelBooking(id){
        //     // console.log(id)
        //     // console.log(bookings)
        //     axios.delete(`http://localhost:8070/api/booking/delete/${id}`).then(() => Swal.fire("Success" , "Booking Cancelled", "success")).then(()=>{ window.location.href = "http://localhost:3000/user/userprofile"});
            
        //   }
        
            return (
                <div className="container">
                    
                   <div className="row justify-content-center">
                       <div class="col-md-6">
                           
                           {occasions && (occasions.map(occasion =>{
                               return( 
     
                                <div class="col-md">
        <div class="card bg-c-blue order-card">
            <div class="card-block">
                    <h4>{occasion.type}</h4>   
                    <p><b>Menu type : </b>{occasion.menu}</p>   
                    <p><b>occ time: </b> {occasion.time}</p>
                    <p><b> Num of guest : </b>{occasion.guests }</p>
                    <p><b> email : </b>{occasion.email }</p>


                    <Link to={"/specialoccasion/OccasionHome/ViewOccasion/Change/"+occasion._id} className="btn btn-outline-light" value={occasion._id}>{"Update"}</Link>
            </div>
        </div>
    </div>
                                )  
                           }
                           ))}
        
                       </div>
                   </div>
                 
                </div>
            )
        }
        