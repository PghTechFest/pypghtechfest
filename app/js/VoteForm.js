import React from 'react';
import $ from 'jquery';

var VoteForm = React.createClass({
  // handleVoteSubmit: function(vote) {
  //   console.log('In VoteForm.handleVoteSubmit-talkId=', vote.talkId);
  //   $.ajax({
  //     url: this.props.votesUrl,
  //     contentType: "application/json",
  //     dataType: 'json',
  //     type: 'POST',
  //     data: JSON.stringify(vote),
  //     success: function(data) {
  //       this.setState({id: data.id});
  //       console.log('Saved vote change-id=', data.id);
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.votesUrl, status, err.toString());
  //     }.bind(this)
  //   });
  // },
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
    console.log('VoteForm.componentWillReceiveProps-talkId=', nextProps.vote.talkId);
    // this.setState({
    //   email: nextProps.vote.email,
    //   expectedAttendance: nextProps.vote.expectedAttendance,
    //   fitsTechfest: nextProps.vote.fitsTechfest,
    //   fitsTrack: nextProps.vote.fitsTrack,
    //   id: nextProps.vote.id,
    //   talkId: nextProps.vote.talkId
    // });
  },
  handleTechfestFitChange: function(e) {
    var newFitsTechfest = parseInt(e.target.value);
    var vote = Object.assign({}, this.props.vote);
    vote.fitsTechfest = newFitsTechfest;
    this.props.handleVoteSubmit(vote);

    // this.setState({fitsTechfest: newFitsTechfest});
  },
  handleTrackFitChange: function(e) {
    var newFitsTrack = parseInt(e.target.value);
    var vote = Object.assign({}, this.props.vote);
    vote.fitsTrack = newFitsTrack;
    this.props.handleVoteSubmit(vote);

    // this.setState({fitsTrack: newFitsTrack});
  },
  handleExpectedAttendanceChange: function(e) {
    var newExpectedAttendance = parseInt(e.target.value);
    var vote = Object.assign({}, this.props.vote);
    vote.expectedAttendance = newExpectedAttendance;
    this.props.handleVoteSubmit(vote);

    // this.setState({expectedAttendance: newExpectedAttendance});
  },
  render: function() {
    console.log('In VoteForm.render-talkId=', this.state.talkId);
    return (
      <div>
        <div>
          TechFest Fit:
          <select
            value={this.props.vote.fitsTechfest}
            onChange={this.handleTechfestFitChange}>
            <option value="0">None</option>
            <option value="1">Marginal</option>
            <option value="2">Decent</option>
            <option value="3">Solid</option>
            <option value="4">Awesome</option>
          </select>
        </div>
        <div>
          Track Fit:
          <select
            value={this.props.vote.fitsTrack}
            onChange={this.handleTrackFitChange}>
            <option value="0">None</option>
            <option value="1">Marginal</option>
            <option value="2">Decent</option>
            <option value="3">Solid</option>
            <option value="4">Awesome</option>
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
