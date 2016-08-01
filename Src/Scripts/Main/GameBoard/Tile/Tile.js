import React from "react";
import Paper from "material-ui/Paper";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: "plain", value: this.props.value, disabled: this.props.disabled}
  }

  openTile() {
    if (!this.state.disabled) {
      var value = this.state.value;
      var tileColor;
      if (value === 0) {
        tileColor = "red";
      } else if (value === 1) {
        tileColor = "yellow";
      } else if (value === 2) {
        tileColor = "blue";
      } else if (value === 3) {
        tileColor = "green";
      }
      this.setState({view: "colored", tileColor: tileColor});
      
      this.props.openTile(this.props.index, value)
    } 
  }

  componentWillReceiveProps(nextProps) {
    var resetTile = nextProps.resetTile;
    if(resetTile.open && (resetTile.tileOne == nextProps.index || resetTile.tileTwo == nextProps.index)) {
      this.setState({view: "reset"});
    } 
    if (nextProps.resetAll) {
      this.setState({view: "reset"});
    } 
    this.setState({disabled: nextProps.disabled}); 
  }

  render() {
    return (
      <Paper 
        className={this.state.view}
        onClick={this.openTile.bind(this)} 
        key={this.props.index} 
        style={{
          backgroundColor: this.state.view == "plain" || this.state.view == "reset" ? "white" : this.state.tileColor, 
          width: 50, 
          height: 50, 
          marginTop: 10, 
          marginLeft: 10, 
          textAlign: "left", 
          border: "1px solid #E0E0E0", 
          display: "inline-block"}} 
        zDepth={1}
      />
    );
  }
}