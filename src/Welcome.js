import React from "react";

export default class Welcome extends React.Component {
    constructor() {
        super();
        this.state = {
            year: ""
        }
    }

    render() {
        return (
            <div className="welcome-content" >
                <h1>Welcome</h1>

            </div>
        )
    }
}