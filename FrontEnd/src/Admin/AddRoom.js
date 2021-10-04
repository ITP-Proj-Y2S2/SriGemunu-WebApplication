import React,{useState} from 'react';
import axios from 'axios';

 const AddRoom=()=>{

    const[name, setName] = useState("");
    const[type, setType] = useState("");
    const[size, setSize] = useState(0);
    const[number, setNumber] = useState(0);
    const[imageurls, setImageurls] = useState([]);
    const[currentbookings, setCurrentbookings] = useState([]);
    const[description, setDescription] = useState("");


    function senddata(e){
        e.preventDefault();

        const newRoom = {
          name,
          type,
          size :Number(size),
          number: Number(number),
          imageurls :[imageurls],
          currentbookings : [currentbookings],
          description,
        };

        console.log(newRoom)

        axios.post("/api/rooms/add",newRoom).then(()=>{
            alert("Room added")
        }).catch((err)=>{
            alert(err)
        })
    } 

    return (
      
        <div className = "container p-5 mt-5" >
           
           <h1 className = "text-center mt-5"> Add new Room </h1>
           <div className="parent-div">
            <div className = "p-5 mt-3">
            <form onSubmit={senddata}>
                <div className="form-group mt-3">
                    <label for="name"  >Name</label>
                    <input type="text" className="form-control" id="name" onChange = {(e)=>{
                        setName(e.target.value);
                    }} />
                </div>

                <div className="form-group mt-3">
                <label for="name"  >Room Type</label><br/>
                <input type="radio"  className="form-check-input" value="Deluxe" name="type" onChange ={(e)=>{setType(e.target.value) }}/> Deluxe <br/>
                <input type="radio"  className="form-check-input" value="King" name="type" onChange ={(e)=>{setType(e.target.value) }}/> King

                 
                </div>

                <div className="form-group mt-3">
                    <label for="size"  >Size</label>
                    <input type="text" className="form-control" id="size" onChange = {(e)=>{
                        setSize(e.target.value);
                    }} />
                </div>

                <div className="form-group mt-3">
                    <label for="number"  >Number</label>
                    <input type="text" className="form-control" id="number" onChange = {(e)=>{
                        setNumber(e.target.value);
                    }} />
                </div>

                <div className="form-group mt-3">
                    <label for="imageurls" >Image URL</label>
                    <input type="text" className="form-control" id="imageurls" onChange = {(e)=>{
                        setImageurls(e.target.value);
                    }}/>
                </div>

                <div className="form-group mt-3">
                    <label for="description" >Description</label>
                    <textarea  type="text" className="form-control" id="description" onChange ={(e)=>{
                        setDescription(e.target.value);
                    }}/>
                </div>

                <button type="submit" className="btn btn-dark mt-5">Submit</button>
            </form>
            </div>
            </div>
         </div>

         

         
    )
}

export default AddRoom;