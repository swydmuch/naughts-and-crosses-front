import React from "react";

export class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={this.props.busy ? 'spinner-border busy' : 'spinner-border'}  role="status" id="spinner">
                <span className="sr-only"></span>
            </div>
        )
    }
}