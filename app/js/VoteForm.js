import React from 'react';
import $ from "jquery";

var VoteForm = React.createClass({
/*
  handleVoteSubmit: function(submission) {
    $.ajax({
      url: this.props.voteUrl,
      dataType: 'json',
      type: 'POST',
      data: submission,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.voteUrl, status, err.toString());
      }.bind(this)
    });
  },
*/
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