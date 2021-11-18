import React from "react";

export class Start extends React.Component {
    render() {
        return (
            <button
                type="button"
                className="btn btn-secondary btn-lg"
                disabled={this.props.isStarted ? 'disabled':''}
                onClick={() => this.props.onClick()}
            >Start</button>
        )
    }
}