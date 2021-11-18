import React from "react";

export class Field extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div
                className={this.props.isActive ? 'square active' : 'square'}
                onClick={() => this.props.onClick()}
            ><p>{this.props.value}</p></div>
        );
    }
}