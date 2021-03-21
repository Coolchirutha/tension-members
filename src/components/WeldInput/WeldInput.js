import React, { Component } from "react";

import classes from "./WeldInput.module.css";

import classnames from "classnames";

class WeldInput extends Component {
  constructor(props) {
    super();
    this.state = {
      factoredLoad: 0,
      lengthOfTensionMember: 0,
      allowableSlendernessRatio: 0,
      gussetPlateThickness: 0,
      throatThickness: 0,
      weldTypeDropdown: "Custom Safety Factor",
      customSafetyFactor: 0,
      isFe410: false,
      ultimateTensileStress: 0,
      yieldStress: 0,
      isIS800: false,
      ym1: 0,
      ym0: 0,
      typeOfSection: "Equal",
      sectionTypeDropdown: "Connected leg larger",
    };
  }

  handleSubmit = () => {
    console.log("FORM Submit");
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
          onSubmit={() => this.handleSubmit()}
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
              <legend>Properties of Weld</legend>
              <div
                className={classnames(classes.formGroup, classes.rightAlign)}
              >
                <label className={classes.inputLabel}>
                  Throat Thickness of weld (in mm):
                </label>
                <input
                  className={classes.textInput}
                  name="throatThickness"
                  value={this.state.throatThickness}
                  onChange={this.updateInputValue}
                  type="text"
                />
              </div>
              <fieldset>
                <legend>Partial Safety Factor</legend>
                <div className={(classes.formGroup, classes.leftAlign)}>
                  <select
                    className={classes.weldTypeDropdown}
                    name="weldTypeDropdown"
                    value={this.state.weldTypeDropdown}
                    onChange={this.updateInputValue}
                  >
                    <option value="Custom Safety Factor">
                      Custom Safety Factor
                    </option>
                    <option value="Shop Welding">Shop Welding</option>
                    <option value="Site Welding">Site Welding</option>
                  </select>
                </div>
                <div
                  className={classnames(classes.formGroup, classes.rightAlign)}
                >
                  <label className={classes.inputLabel}>
                    Custom Safety Factor:
                  </label>
                  <input
                    className={classes.textInput}
                    name="customSafetyFactor"
                    value={
                      this.state.weldTypeDropdown === "Custom Safety Factor"
                        ? this.state.customSafetyFactor
                        : this.state.weldTypeDropdown === "Shop Welding"
                        ? 1.25
                        : 1.5
                    }
                    onChange={this.updateInputValue}
                    disabled={
                      this.state.weldTypeDropdown === "Custom Safety Factor"
                        ? false
                        : true
                    }
                    type="text"
                  />
                </div>
              </fieldset>
            </fieldset>
          </div>
          <div className={classes.right}>
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
                  name="ultimateTensileStress"
                  value={
                    this.state.isFe410 ? 410 : this.state.ultimateTensileStress
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

export default WeldInput;
