import React, { Component } from "react";
import classnames from "classnames";

import MemberCard from "../MemberCard/MemberCard";
import classes from "./Homepage.module.css";

// Image Imports
import SingleBolted from "../../images/single_angle_section_with_bolted_connections.png";
import SingleWelded from "../../images/single_angle_section_with_welded_connections.png";
import TwoSame from "../../images/two_angle_sections_placed_back_to_back_on_same_side_of_gusset_plate.png";
import TwoOpposite from "../../images/two_angle_sections_placed_back_to_back_on_opposite_sides_of_gusset_plate.png";
import TwoOppositeWelded from "../../images/two_angle_sections_placed_back_to_back_on_opposite_side_of_gusset_plate_welded.png";

class Homepage extends Component {
  constructor(props) {
    super();
    this.state = {
      currentSelected: 0,
    };
  }

  updateSelected = (id) => {
    this.setState({
      currentSelected: id,
    });
  };

  handleSubmit = () => {
    this.props.history.push("/WeldInput");
  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.header}>Design of Tension Members (Angles)</div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            Choose the type of member you want to design
          </div>
          <div className={classes.cardList}>
            <MemberCard
              id={1}
              image={SingleBolted}
              altText="Single Angle Section with Bolted Connections"
              className={classes.left}
              currentSelected={this.state.currentSelected}
              updateSelected={this.updateSelected}
            ></MemberCard>
            <MemberCard
              id={2}
              image={SingleWelded}
              altText="Single Angle Section with Welded Connections"
              className={classes.right}
              currentSelected={this.state.currentSelected}
              updateSelected={this.updateSelected}
            ></MemberCard>
          </div>
          {this.state.currentSelected !== 0 ? (
            <div className={classnames(classes.panel, classes.pink)}>
              <button onClick={this.handleSubmit}>Give input Values</button>
            </div>
          ) : null}
          <div className={classes.cardList}>
            <MemberCard
              id={3}
              altText="Two Angle Sections placed back to back on same side of Gusset Plate"
              image={TwoSame}
              className={classes.left}
              currentSelected={this.state.currentSelected}
              updateSelected={this.updateSelected}
            ></MemberCard>
            <MemberCard
              id={4}
              image={TwoOpposite}
              altText="Two Angle Sections placed back to back on opposite side of Gusset Plate"
              className={classes.right}
              currentSelected={this.state.currentSelected}
              updateSelected={this.updateSelected}
            ></MemberCard>
            <MemberCard
              id={5}
              image={TwoOppositeWelded}
              altText="Two Angle Sections placed back to back on opposite side of Gusset Plate with Welded Connection"
              className={classes.right}
              currentSelected={this.state.currentSelected}
              updateSelected={this.updateSelected}
            ></MemberCard>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
