import React from 'react';
import SubmissionList from './SubmissionList';
import $ from "jquery";

var SubmissionBox = React.createClass({
  loadSubmissionsFromServer: function() {
    $.ajax({
      url: this.props.submissionsUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({submissions: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.submissionsUrl, status, err.toString());
      }.bind(this)
    });
  },
  loadVotesFromServer: function() {
    $.ajax({
      url: this.props.votesUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({votes: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.votesUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {submissions: [], votes: [], votesUrl: ""};
  },
  componentDidMount: function() {
    this.setState({votesUrl: this.props.votesUrl});
    this.loadSubmissionsFromServer();
    this.loadVotesFromServer();
    //setInterval(this.loadSubmissionsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <SubmissionList
        submissions={this.state.submissions}
        votes={this.state.votes}
        votesUrl={this.state.votesUrl}/>
    );
  }
});

export default SubmissionBox;