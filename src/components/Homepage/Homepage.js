import React, { Component } from "react";

import MemberCard from "../MemberCard/MemberCard";
import classes from "./Homepage.module.css";

// Image Imports
import SingleBolted from "../../images/single_angle_section_with_bolted_connections.png";
import SingleWelded from "../../images/single_angle_section_with_welded_connections.png";
import TwoSame from "../../images/two_angle_sections_placed_back_to_back_on_same_side_of_gusset_plate.png";
import TwoOpposite from "../../images/two_angle_sections_placed_back_to_back_on_opposite_sides_of_gusset_plate.png";

class Homepage extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.header}>Design of Tension Members</div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            Choose the type of member you want to design
          </div>
          <div className={classes.cardList}>
            <MemberCard
              image={SingleBolted}
              altText="Single Angle Section with Bolted Connections"
              className={classes.left}
            ></MemberCard>
            <MemberCard
              image={SingleWelded}
              altText="Single Angle Section with Welded Connections"
              className={classes.right}
            ></MemberCard>
            <MemberCard
              altText="Two Angle Sections placed back to back on same side of Gusset Plate"
              image={TwoSame}
              className={classes.left}
            ></MemberCard>
            <MemberCard
              image={TwoOpposite}
              altText="Two Angle Sections placed back to back on opposite side of Gusset Plate"
              className={classes.right}
            ></MemberCard>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
