import React, { useState, useEffect } from "react";
import axios from "axios";
import Occasion from "./Occasion";
import jspdf from "jspdf"
import 'jspdf-autotable'

export default function AdminOccasion(){
  const [occasions, setOccasions] = useState([]);
  useEffect(async () => {
    try {
      const occ = (await axios.get("http://localhost:8070/occasion/")).data;
      setOccasions(occ);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function deleteHandler(id){
    axios.delete("http://localhost:8070/occasion/delete/"+id).then(() => alert("deleted successfully")).then(()=>{
      const list = occasions.filter((item) => item._id !== id);
      setOccasions(list);
    });
  }

  function genPdf() {
    const doc = new jspdf();
    const tableColumn = [ "email" ,"guests","menu", "time", "type", "booked date" ,"guests"];
    const tableRows = [];
    occasions
      .map((occasion) => {
        const occasionpdf = [
          occasion.email,
          occasion.guests,
          occasion.menu,
          occasion.time,
          occasion.type,
          occasion.bookedDate,
          occasion.guests
        ];
        tableRows.push(occasionpdf);
      });
    doc.text("Occasions ", 25, 20).setFontSize(12);
    doc.autoTable(tableColumn, tableRows, {
      styles: { fontSize: 10, halign: "center" , color:"red"},startY: 35,});
    window.open(URL.createObjectURL(doc.output("blob")));
    doc.save("occasion.pdf");
  }




  return(
      <div>
     
        <div className="container">
      <br/><br/><br/>
      <h1 className="text-center mt-2">Manage Booked Events</h1>
<div className ="row justify-content-center">  
  <div className ="col align-self-center">
  <button className = "btn btn-primary btn-lg btn-block"  onClick = {()=>{genPdf()}}>print all occasions</button>
  </div>
</div>
      
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

