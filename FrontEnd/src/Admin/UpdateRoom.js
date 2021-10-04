import React,{useState} from 'react';
import axios from 'axios';

 const UpdateRoom=(props)=>{

    const[id, setId] = useState(props.location.state.roomId);
    const[name, setName] = useState(props.location.state.roomName);
    const[type, setType] = useState(props.location.state.roomType);
    const[size, setSize] = useState(props.location.state.roomSize);
    const[number, setNumber] = useState(props.location.state.roomNumber);
    const[imageurls, setImageurls] = useState(props.location.state.roomImageURLs);
    const[currentbookings, setCurrentbookings] = useState(props.location.state.roomName);
    const[description, setDescription] = useState(props.location.state.roomdescription);


    function senddata(e){
        e.preventDefault();

        const updateRoom = {
          name,
          type,
          size :Number(size),
          number: Number(number),
          imageurls :[imageurls],
          description,
        };

        console.log(updateRoom)

        axios.put(`/api/rooms/update/${id}`,updateRoom).then(()=>{
            alert("Room Updated")
        }).catch((err)=>{
            alert(err)
        })
    } 

    return (
      
        <div className = "container p-5 mt-5">
           
           <h1 className = "text-center mt-5"> Update Room </h1>
           <div className="parent-div">
            <div className = "p-5 mt-3">
            <form onSubmit={senddata}>
                <div className="form-group mt-3">
                    <label for="name"  >Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange = {(e)=>{
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
                    <input type="text" className="form-control" id="size"  value={size} onChange = {(e)=>{
                        setSize(e.target.value);
                    }} />
                </div>

                <div className="form-group mt-3">
                    <label for="number"  >Number</label>
                    <input type="text" className="form-control" id="number" value={number}  onChange = {(e)=>{
                        setNumber(e.target.value);
                    }} />
                </div>

                <div className="form-group mt-3">
                    <label for="imageurls" >Image URL</label>
                    <input type="text" className="form-control" id="imageurls"  value={imageurls} onChange = {(e)=>{
                        setImageurls(e.target.value);
                    }}/>
                </div>

                <div className="form-group mt-3">
                    <label for="description" >Description</label>
                    <textarea  type="text" className="form-control" id="description" value={description} onChange ={(e)=>{
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

export default UpdateRoom;