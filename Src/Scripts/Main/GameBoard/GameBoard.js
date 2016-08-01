import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import Tile from "./Tile/Tile"

class ResetTile {
  constructor(open, tileOne, tileTwo) {
    this.open = open;
    this.tileOne = tileOne;
    this.tileTwo = tileTwo;
  }
}

class TileData {
  constructor(open, index, value) {
    this.open = open;
    this.index = index;
    this.value = value;
  }
}

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    var rows = [0, 1, 2, 3];
    var columns = [0, 1, 2, 3];
    
    var valueArray = [0, 1, 2, 3, 2, 1, 3, 0, 0, 1, 2, 3, 2, 1, 3, 0];
    this.randomiseArray(valueArray);

    var gameMatrix = [[],[],[],[]];
    
    valueArray.forEach(function(element, index) {
      gameMatrix[Math.floor(index / 4)][index % 4] = element;
    }) 
    
    this.state = {
      timeLeft: 60, 
      open: true,
      tileOne: new TileData(false, -1, -1), 
      tileTwo: new TileData(false, -1, -1),
      resetBothTiles: false, 
      rows: rows, 
      columns: columns, 
      gameMatrix: gameMatrix,
      tilesOpenedTillNow: 0,
      disabled: false,
      level: 1,
      timeLimit: 60,
      minScore: 120,
      resetAll: false,
      initialMessage: true
    };
  }

  randomiseArray(valueArray) {
    var currentIndex = valueArray.length; 
    var temporaryValue; 
    var randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = valueArray[currentIndex];
      valueArray[currentIndex] = valueArray[randomIndex];
      valueArray[randomIndex] = temporaryValue;
    }
  }

  openTile(index, value) {
    var tile = new TileData(true, index, value);
    if (!this.state.tileOne.open && !this.state.tileTwo.open) {
      this.setState({tileOne: tile, resetBothTiles: false});
    } else if (this.state.tileOne.open && !this.state.tileTwo.open) {
      this.setState({tileTwo: tile, resetBothTiles: false, disabled: true});
    }
  }

  componentDidMount() {
    this.setState({open: true});     
  }

  tick() {
    var timeLeft = this.state.timeLeft;
    timeLeft--;
    var timeString;
    if (timeLeft > 9) {
      timeString = "0:" + timeLeft;
    } else {
      timeString = "0:0" + timeLeft;
    }

    this.props.changeTime(timeString);
    
    var tileOne = this.state.tileOne;
    var tileTwo = this.state.tileTwo;
    var tilesOpen = this.state.tilesOpenedTillNow;

    if (timeLeft > 0) {
      if (tileOne.open && tileTwo.open){
        if (tileOne.value != tileTwo.value) {
          this.setState({resetBothTiles: true, tileOne: new TileData(false, tileOne.index, tileOne.value), tileTwo: new TileData(false, tileTwo.index, tileTwo.value)});
          this.props.updateScore(-5);
        }
        else {
          tilesOpen += 2;
          this.setState({tilesOpenedTillNow: tilesOpen, tileOne: new TileData(false, -1, -1), tileTwo: new TileData(false, -1, -1)});
          this.props.updateScore(20);
        }
        this.setState({disabled: false});
      }

      if (tilesOpen == 16) {
        clearInterval(this.timer);
        this.props.updateScore(timeLeft);
        this.setState({success: true, open: true, resetAll: true, tilesOpenedTillNow: 0});
        // this.updateLevel();
      } else {
        this.setState({timeLeft: timeLeft, initialMessage: false});
      }
    } else {
      clearInterval(this.timer);
      this.setState({success: false});
    }
  }

  updateLevel() {
    var level = this.state.level;
    var minScore = this.state.minScore;
    var timeLimit = this.state.timeLimit;
    level += 1;
    minScore += 20;
    timeLimit -= 10;
    this.setState({tilesOpenedTillNow: 0, disabled: false, resetAll: true, open: true, level: level, minScore: minScore, timeLimit: timeLimit, timeLeft: timeLimit});
  }

  handleClose() {
    this.timer = setInterval(this.tick.bind(this), 1000);
    this.setState({open: false});
  }

  render() {
    var self = this;
    var resetTiles = new ResetTile(self.state.resetBothTiles, self.state.tileOne.index, self.state.tileTwo.index)
    var actionButton = <FlatButton label="Start" primary={true} onClick={self.handleClose.bind(self)}/>
    return (
      <div style={{marginTop: 50}}>
        {
          self.state.rows.map(function(element, rowIndex) {
            return (
              <div key={rowIndex} style={{marginLeft: 50}}>
                {
                  self.state.columns.map(function(element, columnIndex) {
                    return <Tile resetAll={self.state.resetAll} disabled={self.state.disabled} resetTile={resetTiles} openTile={self.openTile.bind(self)} key={columnIndex} index={rowIndex * 10 + columnIndex} value={self.state.gameMatrix[rowIndex][columnIndex]}/>
                  })
                }
                <br/>
              </div>
            )
          })
        }
        <Dialog title={"Level " + self.state.level} actions={actionButton} modal={true} open={self.state.open}>
          {
            self.state.initialMessage ? "You have" + self.state.timeLimit + " seconds to match 8 pairs." +
            "There are 4 different tiles." +
            "Score minimum " + self.state.minScore + " to reach next level." : self.state.success ? "Congrats" : "Sorry, you failed"
          }
        </Dialog>
      </div>
    );
  }
}