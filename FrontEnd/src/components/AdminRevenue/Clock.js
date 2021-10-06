import React, { useEffect,useState } from 'react'

function Clock() {

    const[clockState,setClockState] = useState()

    useEffect(() => {

        setInterval(() => {

            const date= new Date();
            setClockState(date.toLocaleTimeString());

            
        }, 1000);
   
    }, [])

    return (

        <div className="container">
        <br></br>
        <div className="display-6" style={{margin:"10px"}}>
            {clockState}
            <hr></hr>
        </div>
        </div>
    )
}

export default Clock

