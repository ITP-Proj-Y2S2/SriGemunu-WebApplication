import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Occasion from "./Occasion";

export default function AdminOccasion(){


  const [occasions, setOccasions] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const data = (await axios.get("http://localhost:8070/occasion/")).data;
       console.log(data);
      setOccasions(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function deleteHandler(id){
    axios.delete(`http://localhost:8070/occasion/delete/${id}`).then(() => alert("delete success")).then(()=>{
      const list = occasions.filter((item) => item._id !== id);
      setOccasions(list);
    });
  }

  return(
      <div>
        <div className="container">
      <h1 className="text-center mt-2">Occasions</h1>
     

      <div className="row justify-content-center mt-5">
        {occasions.map((occasion) => {
          return (
            <div className="col-md-9 mt-2">
              <Occasion data={occasion} deleteOccasion = {deleteHandler}/>
            </div>
          );
        })}
      </div>
    </div>
  
          

    </div>
  )
}

