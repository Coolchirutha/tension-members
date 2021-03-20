import React, { Component } from "react";

import classes from "./WeldInput.module.css";

class WeldInput extends Component {
  handleSubmit = () => {
    console.log("FORM Submit");
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
              <div className={classes.formGroup}>
                <label className={classes.inputLabel} htmlFor="">
                  Factored Load (in kN):
                </label>
                <input type="text" />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.inputLabel} htmlFor="">
                  Length of tension member (in kN):
                </label>
                <input type="text" />
              </div>
              <div className={classes.formGroup}>
                <label className={classes.inputLabel} htmlFor="">
                  Allowable slenderness ratio:
                </label>
                <input type="text" />
              </div>
            </fieldset>
            <fieldset>
              <legend>Properties of Weld</legend>
              <div className={classes.formGroup}>
                <label className={classes.inputLabel} htmlFor="">
                  Throat Thickness of weld (in mm):
                </label>
                <input type="text" />
              </div>
              <fieldset>
                <legend>Distribution of Weld Length</legend>
                <div className={classes.formGroup}>
                  <label className={classes.radioInputLabel}>
                    <input
                      type="radio"
                      className={classes.radioInputFull}
                      name="testSelectedOption"
                      value="Option 2"
                    />
                    On the two sides parallel to axis of the load
                  </label>
                  <label className={classes.radioInputLabel}>
                    <input
                      type="radio"
                      className={classes.radioInputFull}
                      name="testSelectedOption"
                      value="Option 2"
                    />
                    On three sides (one side perpendicular to load)
                  </label>
                </div>
              </fieldset>
              <fieldset>
                <legend>Partial Safety Factor</legend>
                <div className={classes.formGroup}>
                  <label className={classes.inputLabel} htmlFor="">
                    Throat Thickness of weld (in mm):
                  </label>
                  <input type="text" />
                </div>
              </fieldset>
            </fieldset>
          </div>
          <div className={classes.right}>
            <div className={classes.formGroup}>
              <label className={classes.inputLabel} htmlFor="">
                Length of Tension Members (in MPa):
              </label>
              <input type="text" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default WeldInput;
