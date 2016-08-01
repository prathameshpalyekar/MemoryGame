import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Paper from "material-ui/Paper";
import Chip from "material-ui/Chip";
import "./../Css/Main.css";
import GameBoard from "./GameBoard/GameBoard";

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {timeLeft: "1:00", score: 0}
  }

  changeTime(value) {
    this.setState({timeLeft: value});
  }

  updateScore(value) {
    var score = this.state.score;
    score += value;
    if (score < 0) {
      score = 0;
    }
    this.setState({score: score});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Paper style={{width: 400, height: 400, margin: "20px auto", textAlign: "left", border: "1px solid #E0E0E0"}} zDepth={1}>
            <Paper className="game-panel" style={{width: 380, height: 380, margin: "10px auto", textAlign: "left", border: "1px solid #E0E0E0"}} zDepth={0}>
              <div style={{display: "inline-block", float: "right", marginTop: 10, marginRight: 10}}>
                <Chip>{this.state.timeLeft}</Chip>
              </div>
              <GameBoard score={this.state.score} changeTime={this.changeTime.bind(this)} updateScore={this.updateScore.bind(this)}/>
              <div style={{display: "inline-block", float: "left", marginTop: 10, marginLeft: 10}}>
                <Chip>Score : {this.state.score}</Chip>
              </div>
            </Paper>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}



