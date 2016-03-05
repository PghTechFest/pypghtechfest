import React from 'react';

var Submission = React.createClass({
  render: function() {
    return <div>
        <div><b>{this.props.title}</b></div>
        <div>{this.props.abstract}</div>
        <div>{this.props.tracks}</div>
      </div>;
  }
});

export default Submission;