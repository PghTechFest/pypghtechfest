import React from 'react';
import $ from 'jquery';

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
  getInitialState: function() {
    console.log(this.props);
    if (this.props.vote == {}){
      return {
          email: "",
          expectedAttendance: 0,
          fitsTechfest: 0,
          fitsTrack: 0,
          id: 0,
          talkId: this.props.talkId
      };
    }
    return this.props.vote;
  },
  handleFitChange: function(e) {
    this.setState({fitsTechfest: e.target.value});
  },
  render: function() {
    return (
      <div>
        <div>
          Fit:
          <select value="{this.state.fitsTechfest}"
            onChange={this.handleFitChange}>
            <option value="0">None</option>
            <option value="1">Marginal</option>
            <option value="2">Decent</option>
            <option value="3">Solid</option>
            <option value="4">Awesome</option>
          </select>
        </div>
      </div>
    );
  }
});

export default VoteForm;