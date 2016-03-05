import React from 'react';

var VoteForm = React.createClass({
  render: function() {
    return <div>
        <div>{this.props.email}</div>
        <div>TechFest Fit []</div>
        <div>Track Fit []</div>
        <div>Attendance []</div>
      </div>;
  }
});

export default VoteForm;