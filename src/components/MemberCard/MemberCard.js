import React, { Component } from "react";

import classes from "./MemberCard.module.css";

export default class MemberCard extends Component {
  constructor(props){
    super();
    this.state = {};
  }
  render() {
    return (
      <div className={classes.container}>
        <img
          src={this.props.image}
          alt={this.props.altText}
          className={classes.memberImage}
        />
      </div>
    );
  }
}
