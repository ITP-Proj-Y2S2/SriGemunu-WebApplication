import React, {useState, useEffect} from "react";
import axios from "axios";

//export default function AllInvoices() {

    // const [invoices,setInvoices] = useState([]);

    // useEffect(()=> {
    //     function getInvoices() {
    //         axios.get("http://localhost:8070/student/").then((res)=>{
    //             console.table(res.data);
    //             setInvoices(res.data);
    //         }).catch((err)=>{
    //             alert(err.message)
    //         })
    //     }
    //     getInvoices();

    // },[])

    

    const AllInvoices = ({posts}) => {

        return(
            <div className="container">
            <br></br>
            <h1>View All Invoices</h1>
            <br></br>


            {posts.map((AllInvoices)=>(

                <div>
                <h4>{AllInvoices.billingName}</h4>


                </div>
            ))}

            </div>
        )

    }

    export default AllInvoices;




    //}
