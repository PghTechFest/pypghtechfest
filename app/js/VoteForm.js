import React from 'react';

var VoteForm = React.createClass({
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
  handleTechfestFitChange: function(e) {
    var newFitsTechfest = parseInt(e.target.value);
    var vote = Object.assign({}, this.props.vote);
    vote.fitsTechfest = newFitsTechfest;
    this.props.handleVoteSubmit(vote);
  },
  handleTrackFitChange: function(e) {
    var newFitsTrack = parseInt(e.target.value);
    var vote = Object.assign({}, this.props.vote);
    vote.fitsTrack = newFitsTrack;
    this.props.handleVoteSubmit(vote);
  },
  handleExpectedAttendanceChange: function(e) {
    var newExpectedAttendance = parseInt(e.target.value);
    var vote = Object.assign({}, this.props.vote);
    vote.expectedAttendance = newExpectedAttendance;
    this.props.handleVoteSubmit(vote);
  },
  render: function() {
    return (
      <div>
        <div>
          TechFest Fit:
          <select
            value={this.props.vote.fitsTechfest}
            onChange={this.handleTechfestFitChange}>
            <option value="0">0 - Nope Nope Nope</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3 - Marginal</option>
            <option value="4">4</option>
            <option value="5">5 - Decent</option>
            <option value="6">6</option>
            <option value="7">7 - Solid</option>
            <option value="8">8</option>
            <option value="9">9 - Awesome</option>
          </select>
        </div>
        <div>
          I'd Go:
          <select
            value={this.props.vote.fitsTrack}
            onChange={this.handleTrackFitChange}>
            <option value="0">No</option>
            <option value="1">Meh</option>
            <option value="2">OK</option>
            <option value="3">Probably</option>
            <option value="4">Totes!</option>
          </select>
        </div>
        <div>
          Expected Attendance:
          <select
            value={this.props.vote.expectedAttendance}
            onChange={this.handleExpectedAttendanceChange}>
            <option value="0">Low (10 or less)</option>
            <option value="1">Small (11-20)</option>
            <option value="2">Average (21-40)</option>
            <option value="3">Bigger (41-60)</option>
            <option value="4">Sell-out (more than 60)</option>
          </select>
        </div>
      </div>
    );
  }
});

export default VoteForm;
