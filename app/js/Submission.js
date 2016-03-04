import React from 'react';

var Submission = React.createClass({
  render: function() {
    return <table>
    <tr>
      <td>
        <div><b>{this.props.title}</b></div>
        <div>{this.props.abstract}</div>
        <div>{this.props.tracks}</div>
      </td>
      <td>
        <div>TechFest Fit []</div>
        <div>Track Fit []</div>
        <div>Attendance []</div>
      </td>
    </tr>
  </table>;
  }
});

export default Submission;

