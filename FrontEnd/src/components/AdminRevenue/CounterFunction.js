import React, {useState } from "react";

function CounterFunc()
{
    let  [num,setNumber] = useState(0)

    function incrementNum()
    {
        setNumber(++num)
    }
    return(
        <div>
        <h3>Func Component</h3>
        <h1>Counter = {num} </h1>

        <button onClick ={event=> incrementNum()}>Increment</button>

        </div>
    )
}

export default CounterFunc;