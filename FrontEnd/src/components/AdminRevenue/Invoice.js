import React from "react";

function Invoice({invoice}) {

    return(

        <div className="container">
            <h2>
                {invoice.id+ " " + invoice.name+" "+invoice.age}

            </h2>
        </div>
    )
}

export default Invoice;