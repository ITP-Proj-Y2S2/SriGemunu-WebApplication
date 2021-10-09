import React, { Component }  from "react"
import axios from "axios"


    export default class UpdateForm extends Component{

        constructor(props) {
            super(props);
            
        this.onChangeMaintenanceTitle = this.onChangeMaintenanceTitle.bind(this);
        this.onChangeMaintenanceDescription = this.onChangeMaintenanceDescription.bind(this);
        this.onChangeMaintenancePriority = this.onChangeMaintenancePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            title: '',
            description: '',
            highPriority: false
        }
    }

    componentDidMount() {
        //console.log(this.props.match.params.id)
        axios.get('http://localhost:8070/maintenance/get/' + this.props.match.params.id)
        .then(response => {
            this.setState({ 
                    title: response.data.title,
                    description: response.data.description,
                    highPriority: response.data.highPriority
            })
        })
        .catch(function (err){
            //console.log(error);
            alert(err)
        })
    }
    
    onChangeMaintenanceTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeMaintenanceDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeMaintenancePriority(e) {
        this.setState({
            highPriority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newEditedRequest = {
            title: this.state.title,
            description: this.state.description,
            highPriority: this.state.highPriority,
          };
          
          console.log(newEditedRequest);


        const obj = {
            title: this.state.title,
            description: this.state.description,
            highPriority: this.state.highPriority
            
        };

    console.log(obj);

    axios.put('http://localhost:8070/maintenance/update/' + this.props.match.params.id, obj)
    .then((res) => {
        console.log(res.data)
        console.log('Request Updated')
        alert("Request Updated")
        
      }).catch((error) => {
        console.log(error)
      })
      window.location.href = "http://localhost:3000/yourposts"
        
        this.props.history.push('/');
    }

render() {
    return (
        <div className="form-wrapper">
        <form className="updateFormcontainer" onSubmit={this.onSubmit}>

        <br>
        </br>
        <br>
        </br>
        <br>
        </br>
                <div className="mb-3">
                  <label for="title" className="form-label">Title</label>
                  <input type="string" className="form-control" minLength="20" maxLength="60" required id="exampleInputEmail1" aria-describedby="emailHelp" size="50dp" value={this.state.title}
                                onChange={this.onChangeMaintenanceTitle}
                                />

                  <div id="titleHelp" className="form-text">Please enter a brief and concise title.</div>
                </div>
                <div className="mb-3">
                  <label for="description" className="form-label">Description</label>
                  <textarea type="string" className="form-control" minLength="50" maxLength="200" required id="description" value={this.state.description}
                                onChange={this.onChangeMaintenanceDescription}
                                />

                  <div id="descriptionHelp" className="form-text">Please enter as much information as possible.</div>
                </div>
                <div className="mb-3 form-check">
                <label className="form-check-label" for="exampleCheck1">Is this problem an emergency?</label>
                <br></br>
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" value={this.state.highPriority}
                                    onChange={this.onChangeMaintenancePriority}
                                    />
                 
                </div>
                <button type="submit">Update</button>
        <br>
        </br>
        <br>
        </br>
        
        <br>
        </br>
        
        
              </form>
              </div>
    )
  }
}
