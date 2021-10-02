import React from "react";

class CounterClass extends React.Component
{
    constructor()
    {
        super();
        this.incrementNum = this.incrementNum.bind(this)
        this.state = 
        {
            number: 0

        }
    }

    incrementNum()
    {
        this.setState({
            number: ++this.state.number
        })
    }

    render()
    {
        return(
            <div>
            <h3>Class base Component</h3>
            <h1>Counter = {this.state.number}</h1>
            <button onClick={this.incrementNum}>Increment</button>
            <hr></hr>
            </div>
        )
    }
}

export default CounterClass;