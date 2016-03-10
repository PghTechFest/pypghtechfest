import React from 'react';
import SubmissionList from './SubmissionList';
import $ from "jquery";

var SubmissionBox = React.createClass({
  propTypes: {
    votesUrl: React.PropTypes.string.isRequired
  },
  loadSubmissionsFromServer: function() {
    return $.ajax({
      url: this.props.submissionsUrl,
      dataType: 'json',
      cache: false
    });
  },
  loadVotesFromServer: function() {
    return $.ajax({
      url: this.props.votesUrl,
      dataType: 'json',
      cache: false
    });
  },
  handleVoteSubmit: function(vote) {
    console.log('In VoteForm.handleVoteSubmit-talkId=', vote.talkId);
    $.ajax({
      url: this.props.votesUrl,
      contentType: "application/json",
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(vote),
      success: function(data) {
        let votes = [];
        if(this.state.votes.length) {
          votes = this.state.votes.map(vote => vote.id !== data.id ? vote : data)
        } else {
          votes = [data];
        }
        this.setState({
          votes
        });
        console.log('Saved vote change-id=', data.id);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.votesUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {submissions: [], votes: []};
  },
  componentDidMount: function() {
    $.when(this.loadSubmissionsFromServer(), this.loadVotesFromServer())
    .then((submissions, votes) => {
      this.setState({
        submissions: submissions[0],
        votes: votes[0]
      });
    });
  },
  render: function() {
    return (
      <SubmissionList
        submissions={this.state.submissions}
        votes={this.state.votes}
        votesUrl={this.props.votesUrl}
        handleVoteSubmit={this.handleVoteSubmit} />
    );
  }
});

export default SubmissionBox;
