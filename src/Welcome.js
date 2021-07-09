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
            <div className="welcome-content" style={{
                backgroundImage: "url(../img/f1.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}>
                <h1>Welcome</h1>
                
            </div>
        )
    }
}