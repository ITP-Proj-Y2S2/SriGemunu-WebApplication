import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AdminBooking(props) {
  const [bookings, setbookings] = useState();

  useEffect(async () => {
    try {
      await axios
        .get("/api/rooms/getallbookings")
        .then((response) => setbookings(response.data));
     
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div></div>;
}

export default AdminBooking;
