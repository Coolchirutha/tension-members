import React, { Component } from "react";

import classes from "./BoltInput.module.css";
import equalAngle from "../../dataObjects/EqualAngle";
import unequalAngle from "../../dataObjects/UnequalAngle";

import classnames from "classnames";

class BoltInput extends Component {
  constructor(props) {
    super();
    this.state = {
      factoredLoad: 0,
      lengthOfTensionMember: 0,
      allowableSlendernessRatio: 0,
      gussetPlateThickness: 0,
      isFe410: false,
      steelUltimateTensileStress: 0,
      yieldStress: 0,
      isPSFactorsIS800: false,
      ym1: 0,
      ym0: 0,
      boltTypeDropdown: "Custom bolt",
      boltUltimateTensileStress: 0,
      boltDiameter: 0,
      isMinIS800: false,
      pitch: 0,
      endDistance: 0,
      isPSFactorIS800: false,
      ymb: 0,
      typeOfSection: "Equal",
      sectionTypeDropdown: "Larger leg as connected leg",
    };
  }

  determineDH() {
    const dia = parseFloat(this.state.boltDiameter);
    var dh = 0;
    if (dia < 12) {
      window.alert("Please enter a bolt diameter greater than 12mm");
      return -143.69;
    } else if (dia >= 12 && dia <= 14) {
      dh = dia + 1;
    } else if ((dia >= 16 && dia <= 22) || dia === 24) {
      dh = dia + 2;
    } else if (dia > 24) {
      dh = dia + 3;
    } else {
      window.alert(
        "The given diameter isn't available in the market. Please enter a valid input for the bolt diameter"
      );
      return 143.69;
    }
    return dh;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    var [
      count,
      tdn,
      tdb,
      tdb1,
      tdb2,
      tdg,
      ab,
      vdsb,
      k1,
      k2,
      k3,
      kb,
      tdpb,
      vdpb,
      vd,
      n,
      alpha,
      avg,
      avn,
      g,
      atg,
      atn,
    ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Calculating dh value
    var dh = this.determineDH();
    if (dh === -143.69) return;

    // To be run when Take min. values according to IS800 is clicked
    var pitch = this.state.pitch;
    var endDistance = this.state.endDistance;
    if (this.state.isMinIS800) {
      this.setState({
        pitch: 2.5 * parseFloat(this.state.boltDiameter),
        endDistance: 1.5 * dh,
      });
      pitch = 2.5 * parseFloat(this.state.boltDiameter);
      endDistance = 1.5 * dh;
    }

    var ag =
      (parseFloat(this.state.factoredLoad) *
        parseFloat(this.state.ym0) *
        1000) /
      parseFloat(this.state.yieldStress);

    var suitableMember = {};
    var suitableMemberIndex = 0;

    if (this.state.typeOfSection === "Equal") {
      for (let [index, item] of equalAngle.entries()) {
        if (item.An - ag >= 0) {
          suitableMember = item;
          suitableMemberIndex = index;
          break;
        }
      }
      return -143.69;
    } else if (this.state.typeOfSection === "Unequal") {
      for (let [index, item] of unequalAngle.entries()) {
        if (item.An - ag >= 0) {
          suitableMember = item;
          suitableMemberIndex = index;
          break;
        }
      }
      return -143.69;
    }
    do {
      if (count !== 0) {
        suitableMemberIndex++;
        if (this.state.typeOfSection === "Equal") {
          try {
            suitableMember = equalAngle[suitableMemberIndex];
          } catch (error) {
            return -143.69;
          }
        } else if (this.state.typeOfSection === "Unequal") {
          try {
            suitableMember = unequalAngle[suitableMemberIndex];
          } catch (error) {
            return -143.69;
          }
        }
      }

      ab =
        ((this.props.location.state.id === 1
          ? 0.78
          : this.props.location.state.id === 2
          ? 1.78
          : 1.56) *
          Math.PI *
          parseFloat(this.state.boltDiameter) *
          parseFloat(this.state.boltDiameter)) /
        4;

      vdsb =
        (parseFloat(this.state.boltUltimateTensileStress) * ab) /
        (Math.sqrt(3) * parseFloat(this.state.ymb) * 1000);

      k1 = parseFloat(endDistance) / (3 * dh);

      k2 = parseFloat(pitch) / (3 * dh) - 0.25;

      k3 =
        parseFloat(this.state.boltUltimateTensileStress) /
        parseFloat(this.state.steelUltimateTensileStress);

      kb = Math.min(k1, k2, k3, 1);

      tdpb = Math.min(
        parseFloat(this.state.gussetPlateThickness),
        suitableMember.t
      );

      vdpb =
        (2.5 *
          kb *
          parseFloat(this.state.boltDiameter) *
          parseFloat(this.state.steelUltimateTensileStress) *
          tdpb) /
        (parseFloat(this.state.ymb) * 1000);

      vd = Math.min(vdpb, vdsb);
      if (
        this.props.location.state.id === 3 ||
        this.props.location.state.id === 4
      )
        vd *= 2;

      n = Math.ceil(parseFloat(this.state.factoredLoad) / vd);

      alpha = 0;
      if (n === 1 || n === 2) alpha = 0.6;
      else if (n === 3) alpha = 0.7;
      else if (n >= 4) alpha = 0.8;

      avg =
        (parseFloat(pitch) * (n - 1) + parseFloat(endDistance)) *
        suitableMember.t;

      avn =
        (parseFloat(pitch) * (n - 1) +
          parseFloat(endDistance) -
          (n - 0.5) * dh) *
        suitableMember.t;

      g = 0;
      if (parseFloat(pitch) % 5 === 0) g = parseFloat(pitch);

      if (this.state.typeOfSection === "Equal") {
        atg = (suitableMember.Size - g) * suitableMember.t;
        atn = (suitableMember.Size - g - 0.5 * dh) * suitableMember.t;
      } else if (
        this.state.typeOfSection === "Unequal" &&
        this.state.sectionTypeDropdown === "Larger leg as connected leg"
      ) {
        atg = (suitableMember.A - g) * suitableMember.t;
        atn = (suitableMember.A - g - 0.5 * dh) * suitableMember.t;
      } else if (
        this.state.typeOfSection === "Unequal" &&
        this.state.sectionTypeDropdown === "Larger leg as overhanging leg"
      ) {
        atg = (suitableMember.B - g) * suitableMember.t;
        atn = (suitableMember.B - g - 0.5 * dh) * suitableMember.t;
      }

      tdg =
        (suitableMember.An * parseFloat(this.state.yieldStress)) /
        (parseFloat(this.state.ym0) * 1000);

      tdn =
        (alpha *
          suitableMember.An *
          parseFloat(this.state.steelUltimateTensileStress)) /
        (parseFloat(this.state.ym1) * 1000);

      if (
        this.props.location.state.id === 3 ||
        this.props.location.state.id === 4
      )
        tdn *= 2;

      tdb1 =
        (avg * parseFloat(this.state.yieldStress)) /
          (parseFloat(this.state.ym0) * 1000 * Math.sqrt(3)) +
        (0.9 * atn * parseFloat(this.state.steelUltimateTensileStress)) /
          (parseFloat(this.state.ym1) * 1000);

      tdb2 =
        (0.9 * avn * parseFloat(this.state.steelUltimateTensileStress)) /
          (parseFloat(this.state.ym1) * 1000 * Math.sqrt(3)) +
        (atg * parseFloat(this.state.yieldStress)) /
          (parseFloat(this.state.ym0) * 1000);

      tdb = Math.min(tdb1, tdb2);

      if (
        this.props.location.state.id === 3 ||
        this.props.location.state.id === 4
      )
        tdb *= 2;
    } while (
      Math.max(tdg, tdn, tdb) < parseFloat(this.state.factoredLoad) &&
      parseFloat(this.state.allowableSlendernessRatio) <
        parseFloat(this.state.lengthOfTensionMember) / suitableMember.rmin
    );
    window.alert(
      "The suitable member for the input parameters is " +
        suitableMember.Designation +
        " and the number of bolts used are " +
        n
    );
  };

  updateInputValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateCheckboxValue = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.header}>Enter the design input parameters</div>
        <form
          className={classes.inputForm}
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <div className={classes.left}>
            <fieldset>
              <legend>Inputs</legend>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Factored Load (in kN):
                </label>
                <input
                  className={classes.textInput}
                  name="factoredLoad"
                  value={this.state.factoredLoad}
                  onChange={this.updateInputValue}
                  type="text"
                />
              </div>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Length of tension member (in mm):
                </label>
                <input
                  className={classes.textInput}
                  name="lengthOfTensionMember"
                  value={this.state.lengthOfTensionMember}
                  onChange={this.updateInputValue}
                  type="text"
                />
              </div>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Allowable slenderness ratio:
                </label>
                <input
                  className={classes.textInput}
                  name="allowableSlendernessRatio"
                  value={this.state.allowableSlendernessRatio}
                  onChange={this.updateInputValue}
                  type="text"
                />
              </div>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Thickness of gusset plate (in mm):
                </label>
                <input
                  className={classes.textInput}
                  name="gussetPlateThickness"
                  value={this.state.gussetPlateThickness}
                  onChange={this.updateInputValue}
                  type="text"
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Properties of Steel</legend>
              <div className={classnames(classes.formGroup, classes.leftAlign)}>
                <label className={classes.inputLabel}>
                  <input
                    type="checkbox"
                    name="isFe410"
                    checked={this.state.isFe410}
                    onChange={this.updateCheckboxValue}
                    onClick={() => {
                      this.setState({
                        steelUltimateTensileStress: 410,
                        yieldStress: 250,
                      });
                    }}
                  />
                  Fe410 steel
                </label>
              </div>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Ultimate tensile stress (in MPa):
                </label>
                <input
                  className={classes.textInput}
                  name="steelUltimateTensileStress"
                  value={
                    this.state.isFe410
                      ? 410
                      : this.state.steelUltimateTensileStress
                  }
                  onChange={this.updateInputValue}
                  disabled={this.state.isFe410}
                  type="text"
                />
              </div>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Yield stress (in MPa):
                </label>
                <input
                  className={classes.textInput}
                  name="yieldStress"
                  value={this.state.isFe410 ? 250 : this.state.yieldStress}
                  onChange={this.updateInputValue}
                  disabled={this.state.isFe410}
                  type="text"
                />
              </div>
              <fieldset>
                <legend>Partial Safety Factors</legend>
                <div
                  className={classnames(classes.formGroup, classes.leftAlign)}
                >
                  <label className={classes.inputLabel}>
                    <input
                      type="checkbox"
                      name="isPSFactorsIS800"
                      checked={this.state.isPSFactorsIS800}
                      onChange={this.updateCheckboxValue}
                      onClick={() => {
                        this.setState({
                          ym1: 1.25,
                          ym0: 1.1,
                        });
                      }}
                    />
                    Take according to IS 800 table 5 (cl.5.4.1)
                  </label>
                </div>
                <div
                  className={classnames(classes.formGroup, classes.rightAlign)}
                >
                  <label className={classes.inputLabel}>
                    Governed by ultimate stress(ym1)
                  </label>
                  <input
                    className={classes.textInput}
                    name="ym1"
                    value={this.state.isPSFactorsIS800 ? 1.25 : this.state.ym1}
                    onChange={this.updateInputValue}
                    disabled={this.state.isPSFactorsIS800}
                    type="text"
                  />
                </div>
                <div
                  className={classnames(classes.formGroup, classes.rightAlign)}
                >
                  <label className={classes.inputLabel}>
                    Governed by yielding(ym0)
                  </label>
                  <input
                    className={classes.textInput}
                    name="ym0"
                    value={this.state.isPSFactorsIS800 ? 1.1 : this.state.ym0}
                    onChange={this.updateInputValue}
                    disabled={this.state.isPSFactorsIS800}
                    type="text"
                  />
                </div>
              </fieldset>
            </fieldset>
          </div>
          <div className={classes.right}>
            <fieldset>
              <legend>Properties of Bolts</legend>
              <div className={(classes.formGroup, classes.leftAlign)}>
                <select
                  className={classes.boltTypeDropdown}
                  name="boltTypeDropdown"
                  value={this.state.boltTypeDropdown}
                  onChange={this.updateInputValue}
                  onClick={() => {
                    if (this.state.boltTypeDropdown !== "Custom bolt") {
                      this.setState({
                        boltUltimateTensileStress:
                          this.state.boltTypeDropdown === "Custom bolt"
                            ? this.state.boltUltimateTensileStress
                            : this.state.boltTypeDropdown === "Grade 4.6"
                            ? 400
                            : 800,
                      });
                    }
                  }}
                >
                  <option value="Custom bolt">Custom bolt</option>
                  <option value="Grade 4.6">Grade 4.6</option>
                  <option value="Grade 8.8">Grade 8.8</option>
                </select>
              </div>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Ultimate tensile stress (in MPa):
                </label>
                <input
                  className={classes.textInput}
                  name="boltUltimateTensileStress"
                  value={
                    this.state.boltTypeDropdown === "Custom bolt"
                      ? this.state.boltUltimateTensileStress
                      : this.state.boltTypeDropdown === "Grade 4.6"
                      ? 400
                      : 800
                  }
                  onChange={this.updateInputValue}
                  disabled={
                    this.state.boltTypeDropdown === "Custom bolt" ? false : true
                  }
                  type="text"
                />
              </div>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Diameter of Bolt (in mm):
                </label>
                <input
                  className={classes.textInput}
                  name="boltDiameter"
                  value={this.state.boltDiameter}
                  onChange={this.updateInputValue}
                  type="text"
                />
              </div>
              <fieldset>
                <legend>Pitch and end distance</legend>
                <div
                  className={classnames(classes.formGroup, classes.leftAlign)}
                >
                  <label className={classes.inputLabel}>
                    <input
                      type="checkbox"
                      name="isMinIS800"
                      checked={this.state.isMinIS800}
                      onChange={this.updateCheckboxValue}
                    />
                    Take min. value according to code IS800
                  </label>
                </div>
                <div
                  className={classnames(classes.formGroup, classes.rightAlign)}
                >
                  <label className={classes.inputLabel}>Pitch (in mm):</label>
                  <input
                    className={classes.textInput}
                    name="pitch"
                    value={
                      this.state.isMinIS800
                        ? "will be calculated"
                        : this.state.pitch
                    }
                    onChange={this.updateInputValue}
                    disabled={this.state.isMinIS800}
                    type="text"
                  />
                </div>
                <div
                  className={classnames(classes.formGroup, classes.rightAlign)}
                >
                  <label className={classes.inputLabel}>
                    End distance (in mm):
                  </label>
                  <input
                    className={classes.textInput}
                    name="endDistance"
                    value={
                      this.state.isMinIS800
                        ? "will be calculated"
                        : this.state.endDistance
                    }
                    onChange={this.updateInputValue}
                    disabled={this.state.isMinIS800}
                    type="text"
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>Partial Safety Factor</legend>
                <div
                  className={classnames(classes.formGroup, classes.leftAlign)}
                >
                  <label className={classes.inputLabel}>
                    <input
                      type="checkbox"
                      name="isPSFactorIS800"
                      checked={this.state.isPSFactorIS800}
                      onChange={this.updateCheckboxValue}
                      onClick={() => {
                        this.setState({ ymb: 1.25 });
                      }}
                    />
                    Take according to IS800 table 5 (cl. 5.4.1)
                  </label>
                </div>
                <div
                  className={classnames(classes.formGroup, classes.rightAlign)}
                >
                  <label className={classes.inputLabel}>
                    Custom Safety Factor (ymb):
                  </label>
                  <input
                    className={classes.textInput}
                    name="ymb"
                    value={this.state.isPSFactorIS800 ? 1.25 : this.state.ymb}
                    onChange={this.updateInputValue}
                    disabled={this.state.isPSFactorIS800}
                    type="text"
                  />
                </div>
              </fieldset>
            </fieldset>
            <fieldset>
              <legend>Type of section</legend>
              <div className={classnames(classes.formGroup, classes.leftAlign)}>
                <label className={classes.radioInputLabel}>
                  <input
                    type="radio"
                    name="typeOfSection"
                    value="Equal"
                    checked={this.state.typeOfSection === "Equal"}
                    onChange={this.updateInputValue}
                  />
                  Equal
                </label>
                <br />
                <label className={classes.radioInputLabel}>
                  <input
                    type="radio"
                    name="typeOfSection"
                    value="Unequal"
                    checked={this.state.typeOfSection === "Unequal"}
                    onChange={this.updateInputValue}
                  />
                  Unequal
                </label>
              </div>
              <div className={(classes.formGroup, classes.leftAlign)}>
                <select
                  className={classes.sectionTypeDropdown}
                  name="sectionTypeDropdown"
                  value={this.state.sectionTypeDropdown}
                  onChange={this.updateInputValue}
                  disabled={this.state.typeOfSection === "Equal" ? true : false}
                >
                  <option value="Larger leg as connected leg">
                    Larger leg as connected leg
                  </option>
                  <option value="Larger leg as overhanging leg">
                    Larger leg as overhanging leg
                  </option>
                </select>
              </div>
            </fieldset>
            <button type="submit" className={classes.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default BoltInput;
