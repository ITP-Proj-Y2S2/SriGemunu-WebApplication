import React, {Component} from "react"
import axios from "axios"
import { Link } from "react-router-dom"

    const Maintenance = props => (
        <tr>
            <td>{props.request.title}</td>
            <td>{props.request.description}</td>
            <td>{props.request.priority}</td>
            <td>
            <Link to={"/update/"+ props.request._id}>| Edit |</Link>
                <br></br>
                <br></br>
                <button onClick =  {()=>{remove(props.request._id)}} > Delete </button>
            </td>
        </tr>
    )
    


    function remove(id) {
        if (window.confirm("Are you sure? This action cannot be undone")) {
            axios.delete("http://localhost:8070/maintenance/delete/" + id).then(()=>{
                alert("Request Deleted");
                window.location.href = "http://localhost:3000/yourposts"
        
            }).catch((err)=>{
                alert(err)
            })
            
          } else {
            
          }
    

    }

    export default class YourRequests extends Component {

        constructor(props) {
            super(props);
            this.state = {requests: []};
        }

    componentDidMount(){
        axios.get('http://localhost:8070/maintenance/')
        .then(response => {
            this.setState({ requests: response.data });
        })
        .catch(function (error){
            //console.log(error);
            alert(error);
        })
    }

    list() {
        return this.state.requests.map(function(currentRequest, i){
            return <Maintenance request={currentRequest} key={i} />;
        })
    };
    


render() {


    return (
        <div className="YourRequestsContainer">
            <h3>Your Requests</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { this.list() }
                </tbody>
            </table>
        </div>
    )

}
}
