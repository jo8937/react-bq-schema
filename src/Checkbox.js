import React, { Component } from 'react';

class Checkbox extends Component {
  render() {
    return (
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="customCheck1" />
        <label className="custom-control-label" for="customCheck1">Check this custom checkbox</label>
      </div>
		);
  }
}

export default Checkbox;
