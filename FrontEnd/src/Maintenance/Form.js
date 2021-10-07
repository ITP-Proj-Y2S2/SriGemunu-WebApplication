import React, {useState} from "react"
import axios from "axios"

export default function Form() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  function sendData(e){
    e.preventDefault();
    
    const newRequest ={

      title,
      description,
      priority

    }
    axios.post("http://localhost:8070/maintenance/add", newRequest).then(()=>{

        alert("Request Added")
        setTitle("");
        setDescription("");
        setPriority(false);
        window.location.href = "http://localhost:3000/yourposts"

    }).catch((err)=>{

        alert(err)

    })
  }

    return (

        <form className="containerForm" onSubmit={sendData} >

<br>
</br>
<br>
</br>
<br>
</br>

        <div className="mb-36">
          <label for="title" className="form-label">Title</label>
          <input type="string" minLength="20" maxLength="60" required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{
              
              setTitle(e.target.value);

          }}/>
          <div id="titleHelp" className="form-text">Please enter a brief and concise title.</div>
        </div>
        <br></br>
        <div className="mb-3">
          <label for="description" className="form-label">Description</label>
          <textarea type="string" minLength="50" maxLength="200"  required className="form-control2" id="description"
          onChange={(e)=>{

              setDescription(e.target.value);

          }}/>
          <div id="descriptionHelp" className="form-text">Please enter as much information as possible.</div>
        </div>

        <br></br>
        <div className="mb-3 form-check">
        <label className="form-check-label" for="exampleCheck1">Is this problem an emergency?</label>
        <br></br>
          <input type="checkbox"   className="form-check-input" id="exampleCheck1" onChange={(e)=>{
            
              setPriority(e.target.value);
            
          }} />

        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
<br>
</br>
<br>
</br>

<br>
</br>


      </form>

    )
}
/*
function validateForm() {
  let x = document.forms["container"]["fname"].value;
  if (x == "") {
    alert("Cannot be empty must be filled out");
    return false;
  }
}*/
