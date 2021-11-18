import React, { Component} from "react";
import css from './css/style.css';
import {startHandler} from "./modules/startHandler";
import {render} from "react-dom";
import {makeMoveHandler} from "./modules/makeMoveHandler";
import {Start} from "./modules/Start";
import {Field} from "./modules/Field";
import {Spinner} from "./modules/Spinner";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isStarted : false,
            gameId: null,
            playerOnMove: 'X',
            isLoading: false,
            moves: Array(3).fill(null).map(() => Array(3).fill(null))
        }
        this.markMove = this.markMove.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
    }

    markMove(x, y, sign) {
        let moves = this.state.moves;
        moves[x][y] = sign;
        this.setState({moves: moves})
    }

    startLoading() {
        this.setState({isLoading: true});
    }

    stopLoading() {
        this.setState({isLoading: false});
    }

    renderField(x, y, isActive, gameId, moves) {
        return (
            <Field
            isActive={isActive}
            onClick={() => {this.startLoading() ;  makeMoveHandler(x,y,gameId, this.markMove, this.stopLoading)}}
            value={moves[x][y]}
            />
        )
    }

    startClick() {
        if (!this.state.isStarted) {
            this.setState({isStarted: true});
            startHandler((id) => this.setState({gameId: id}));
        }
    }

    render(){
        return(
            <div id="App">
                <Spinner busy={this.state.isLoading}></Spinner>
                <nav>
                    <Start
                        isStarted={this.state.isStarted}
                        onClick={() => this.startClick()}
                    ></Start>
                </nav>
                <main>
                    <section className="clearfix row">
                        {this.renderField(0,2, this.state.isStarted, this.state.gameId, this.state.moves)}
                        {this.renderField(1,2, this.state.isStarted, this.state.gameId, this.state.moves)}
                        {this.renderField(2,2, this.state.isStarted, this.state.gameId, this.state.moves)}
                    </section>
                    <section className="clearfix row">
                        {this.renderField(0,1, this.state.isStarted, this.state.gameId, this.state.moves)}
                        {this.renderField(1,1, this.state.isStarted, this.state.gameId, this.state.moves)}
                        {this.renderField(2,1, this.state.isStarted, this.state.gameId, this.state.moves)}
                    </section>
                    <section className="clearfix row">
                        {this.renderField(0,0, this.state.isStarted, this.state.gameId, this.state.moves)}
                        {this.renderField(1,0, this.state.isStarted, this.state.gameId, this.state.moves)}
                        {this.renderField(2,0, this.state.isStarted, this.state.gameId, this.state.moves)}
                    </section>
                </main>
            </div>
        );
    }
}

export default App;