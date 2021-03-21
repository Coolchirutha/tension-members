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
      sectionTypeDropdown: "Connected leg larger",
    };
  }

  determineDH() {
    const dia = this.state.boltDiameter;
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

    // Calculating dh value
    var dh = this.determineDH();
    if (dh === 143.69) return;

    // To be run when Take min. values according to IS800 is clicked
    if (this.state.isMinIS800) {
      this.setState({
        pitch: 2.5 * this.state.boltDiameter,
        endDistance: 1.5 * dh,
      });
    }

    var ag =
      (this.state.factoredLoad * this.state.ym0 * 100) / this.state.yieldStress;

    if(this.state.typeOfSection === "Equal"){
      equalAngle.forEach((item) => {
        if((item.An - ag) >= 0){
          return item;
        }
      })
    }

    var ab =
      ((this.props.location.state.id === 1
        ? 0.78
        : this.props.location.state.id === 2
        ? 1.78
        : 1.56) *
        Math.PI *
        this.state.boltDiameter *
        this.state.boltDiameter) /
      4;

    var vdsb =
      (this.state.boltUltimateTensileStress * ab) /
      (Math.sqrt(3) * this.state.ymb * 1000);

    var k1 = this.state.endDistance / (3 * dh);

    var k2 = this.state.pitch / (3 * dh) - 0.25;

    var k3 =
      this.state.boltUltimateTensileStress /
      this.state.steelUltimateTensileStress;

    var kb = Math.min(k1, k2, k3, 1);

    // if (t > this.state.gussetPlateThickness)
    //   tdpb = this.state.gussetPlateThickness;
    // else tdpb = t;
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
    console.log(equalAngle[0].Designation);
    console.log(unequalAngle[10].Designation);
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
                  Length of tension member (in kN):
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
                  Thickness of gusset plate:
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
                      name="isIS800"
                      checked={this.state.isIS800}
                      onChange={this.updateCheckboxValue}
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
                    value={this.state.isIS800 ? 1.25 : this.state.ym1}
                    onChange={this.updateInputValue}
                    disabled={this.state.isIS800}
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
                    value={this.state.isIS800 ? 1.1 : this.state.ym0}
                    onChange={this.updateInputValue}
                    disabled={this.state.isIS800}
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
                  <option value="Connected leg larger">
                    Connected leg larger
                  </option>
                  <option value="Connected leg smaller">
                    Connected leg smaller
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
