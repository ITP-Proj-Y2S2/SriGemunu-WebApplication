import React, { Component } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

class ChangeOccassion extends Component {

    constructor(props){
        super(props);

        this.state = {
            EventFetchedData:[],


        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
       
        let input = event.target.value;
        
    
    
        let htmlid = event.target.id;
  
        
        this.setState({ [htmlid]: input });
       
    
       
    
        console.log("States -> " + JSON.stringify(this.state));
      
    
       
      }


      handleSubmit(event) {
        console.log("IN handleSubmit(event)");
        const FetchedRefID = this.props.match.params.id;
        event.preventDefault();

        axios
          .post("http://localhost:8070/occasion/updateEvent/" + FetchedRefID, this.state)
          .then(function (response) {
            console.log(response.data)
            alert("successfully updated the event data")
            
            
            
          })
          .catch(function (error) {
            console.log(error);
            alert("failed to update event data")
          });
      }

    componentDidMount(){

        const EventRefID = this.props.match.params.id;
        console.log("event id "+EventRefID)


        axios
        .get("http://localhost:8070/occasion/view/" + EventRefID)
        .then((response) => {
          console.table(response.data);


          this.setState({ _id: response.data._id });
          this.setState({ data: response.data });
          this.setState({ guests: response.data.guests });
          this.setState({ time: response.data.time });
          this.setState({ email: response.data.email });
          this.setState({ menu: response.data.menu });
          this.setState({ type: response.data.type });
          this.setState({ bookedDate: response.data.bookedDate });
          this.setState({ userId: response.data.userId });

         


          

        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorMsg: "Cannot fetch invoice data" });
        });



    }

    render() {
       

        const {  } = this.state;
        const EventRefID = this.props.match.params.id;

        return(

            <div className="container">
            <br/><br/><br/><br/>
                <h1 >Change Your Event Details</h1>
                <button className="btn btn-secondary " disabled style={{borderRadius:"20px"}}><h4 style={{marginTop:"17px"}}>{"Selected Type: "+this.state.type}</h4></button>
                <br/><br/>

                {/* /////////////////IMPORTING FORM/////////////////// */}

                <form onSubmit={this.handleSubmit}>
  <div class="mb-3 col-md-4">
    <label for="exampleInputEmail1" class="form-label">Menu Type</label>
    <input type="text" class="form-control" id="menu"
    required
        pattern="^Menu[0-9]{1}$"
        maxLength="5"
        value={this.state.menu}
        onChange={this.handleChange}
    />


{/* 
<select class="form-select" aria-label="Default select example" >
  
  <option value={this.state.menu} onChange={this.handleChange} >1000LKR Per per plate</option>
  <option value={this.state.menu} onChange={this.handleChange}>2000LKR Per per plate</option>
  
</select> */}

    
  </div>
  <div class="mb-3 col-md-4">
    <label for="exampleInputPassword1" class="form-label">Event Time</label>
    <input type="text" class="form-control" id="time"
        required
        value={this.state.time}
        onChange={this.handleChange}
    />
  </div>

  <div class="mb-3 col-md-4">
    <label for="exampleInputPassword1" class="form-label">No. of Guests</label>
    <input type="text" class="form-control" id="guests"
    required
        pattern="[0-9]{3}"
        maxLength="3"
         value={this.state.guests}
         onChange={this.handleChange}
    />
  </div>

  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" required/>
    <label class="form-check-label" for="exampleCheck1">I acknowledge all the above information are correct</label>
  </div>
  <button type="submit" class="btn btn-primary" >Update</button>
</form>
 <br/><br/>

                 {/* /////////////////END OF FORM/////////////////// */}
                
            </div>
        )
    }
}

export default ChangeOccassion