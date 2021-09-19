import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Room from "../Admin/Room";
//import AddRoom from "../components/AddRoom";

export default function AdminRooms() {
  const history = useHistory();
  const handleClick = () => history.push("/admin/addRoom");

  const [rooms, setRooms] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const data = (await axios.get("/api/rooms/getallrooms")).data;
      // console.log(data);
      setRooms(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function deleteRoomHandler(id){
    // console.log(id)
    // console.log(rooms)
    axios.delete(`http://localhost:8070/api/rooms/delete/${id}`).then(() => alert("delete success")).then(()=>{
      const newList = rooms.filter((item) => item._id !== id);
      setRooms(newList);
    });
  }



  return (
    <div className="container">
      <h1 className="text-center mt-2">Hotel Rooms</h1>
      <h5 className="text-center mt-3">
        There are currently {rooms.length} rooms in the system
      </h5>
      <div className="d-flex justify-content-center">
        <button className="btn btn-dark mt-4" onClick={handleClick}>
          Add New Room
        </button>
      </div>

      <div className="row justify-content-center mt-5">
        {rooms.map((room) => {
          return (
            <div className="col-md-9 mt-2">
              <Room data={room} deleteRoom = {deleteRoomHandler}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}
