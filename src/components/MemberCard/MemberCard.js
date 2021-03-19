import React, { Component } from "react";
import classnames from "classnames";

import classes from "./MemberCard.module.css";

export default class MemberCard extends Component {
  constructor(props) {
    super();
    this.state = {
      isSelected: false,
      containerClasses: [classes.container],
      captionClasses: [classes.caption],
    };
  }

  handleClick = () => {
    this.state.containerClasses.push(classes.selectedContainer);
    this.props.updateSelected(this.props.id);
    this.setState({
      isSelected: true,
    });
  };

  componentDidUpdate() {
    if (this.state.isSelected && this.props.currentSelected !== this.props.id) {
      this.state.containerClasses.pop();
      this.setState({
        isSelected: false,
      });
    }
  }

  render() {
    return (
      <div
        className={classnames(
          classes.container,
          this.state.isSelected ? classes.selectedContainer : ""
        )}
      >
        <img
          src={this.props.image}
          alt={this.props.altText}
          className={classes.memberImage}
          onClick={() => this.handleClick()}
        />
        <p
          className={classnames(
            classes.caption,
            this.state.isSelected ? classes.captionIn : classes.captionOut
          )}
        >
          {this.props.altText}
        </p>
      </div>
    );
  }
}
