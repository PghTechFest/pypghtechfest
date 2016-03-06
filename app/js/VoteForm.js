import React from 'react';
import $ from 'jquery';

var VoteForm = React.createClass({
  handleVoteSubmit: function(vote) {
    $.ajax({
      url: this.props.votesUrl,
      contentType: "application/json",
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(vote),
      success: function(data) {
        console.log('Saved vote change.');
        //this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.votesUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      email: "",
      expectedAttendance: 0,
      fitsTechfest: 0,
      fitsTrack: 0,
      id: 0,
      talkId: 0
    };
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      email: nextProps.vote.email,
      expectedAttendance: nextProps.vote.expectedAttendance,
      fitsTechfest: nextProps.vote.fitsTechfest,
      fitsTrack: nextProps.vote.fitsTrack,
      id: nextProps.vote.id,
      talkId: nextProps.vote.talkId
    });
  },
  handleFitChange: function(e) {
    var newFitsTechfest = parseInt(e.target.value);
    var vote = this.state;
    vote.fitsTechfest = newFitsTechfest;
    this.handleVoteSubmit(vote);

    this.setState({fitsTechfest: newFitsTechfest});
  },
  render: function() {
    return (
      <div>
        <div>
          Fit:
          <select
            value={this.state.fitsTechfest}
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